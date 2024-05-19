#ForwardImgというフォルダに判定したい画像を入れるとその画像のクラスを予測します
#
#jpgとpngしか読み込めません

import glob
import os
import numpy as np
import torch
import torch.optim as optim
import torchvision.transforms.functional as TF
from torchvision.transforms import v2
import torchvision.models as models
import torch.nn as nn
import cv2
from torch.utils.data import Dataset
from pathlib import Path
from typing import List, Tuple
from torch.utils.data import DataLoader

date=20240513
time=1528
filedate=str(date)+"_"+str(time)
print(filedate)

Channels=3
IMG_SIZE=224
target_epoch=120

Classes = ["bread1", "bread2", "bread3"]
ClassNum = len(Classes)

testpath=r"./ForwardImg"
savepath=r"."

data=list(Path(testpath).glob("*.jpg"))
if(len(data)<1):
    data=list(Path(testpath).glob("*.png"))
print(data)

'''
PytorchではDataloaderという,膨大なデータセットからでもメモリを圧迫せずに取り出せてforループにも対応するための枠組みがある
データセットをDataloaderが引っ張ってこれるような形式にするためにMyDataset(torch.utils.data.Dataset)というクラスを作れば，
あとはそのメソッドをtorch.utils.data.Datasetが勝手に使用してデータを加工してくれる
__init__, __getitem__, __len__をクラス内で必ず定義しなければならない
Dataloader内のデータはバッチごとにまとめられる
'''

class MyDataset(Dataset):
    def __init__(self, data, transforms, Classes) -> None:
        super().__init__()
        self.transforms = transforms
        self.Classes = Classes
        #globは複数のファイルのパスをまとめて取得する
        #訓練と訓練白黒の二個下のディレクトリから画像を取得
        self.data = data

    # ここで取り出すデータを指定している
    def __getitem__(
            self,
            index: int
    ) -> Tuple[torch.Tensor, torch.Tensor]:

        data = self.data[index]
        img1 = cv2.imread(str(data))
        img1 = cv2.resize(img1, (IMG_SIZE, IMG_SIZE))
        img1 = TF.to_tensor(img1)

        # データの変形 (transforms)
        transformed_img = self.transforms(img1)

        return transformed_img

    # この method がないと DataLoader を呼び出す際にエラーを吐かれる
    def __len__(self) -> int:
        return len(self.data)

#入力データに施す処理
transforms = v2.Compose([
        v2.ToDtype(torch.float32, scale=True),
        v2.Normalize(mean=[0,0,0], std=[0.2, 0.2, 0.2]),
        ])

testset= MyDataset(data=data, transforms=transforms, Classes=Classes)


testloader = DataLoader(dataset=testset,batch_size=len(testset),shuffle=False)
print("testloader length:", len(testloader))


resnet50 = models.resnet50()

#modify first layer so it expects 4 input channels; all other parameters unchanged
resnet50.conv1 = torch.nn.Conv2d(Channels,64,kernel_size = (7,7),stride = (2,2), padding = (3,3), bias = False)
#modifying final layer
resnet50.fc = nn.Linear(2048,ClassNum)

#lossfunction&optimizer
loss_fn = nn.CrossEntropyLoss()
optimizer = optim.SGD(resnet50.parameters(), lr=0.001, momentum=0.9)

def evaluate(testloader, model, loss_fn, optimizer):
    # Set the model to evaluation mode - important for batch normalization and dropout layers
    model.eval()
    # Evaluating the model with torch.no_grad() ensures that no gradients are computed during test mode
    # also serves to reduce unnecessary gradient computations and memory usage for tensors with requires_grad=True
    with torch.no_grad():
        for X in testloader:
            pred = model(X)
            
    #predは各クラスの確率になってる（onehotに近い）ので実際のクラス番号に戻す
    pred_class=pred.argmax(1)
    pred_class=np.array(pred_class)
    print("predicted class:", pred_class)

#モデル構築
modelpath = Path(savepath+"/model_weights"+filedate+".pth")
epochmodel = resnet50
epochmodel.load_state_dict(torch.load(modelpath, torch.device('cpu')))

print("Model in Epoch", target_epoch)
#テストデータで評価
evaluate(testloader, epochmodel, loss_fn, optimizer)

print('Forwarding Complete!!!')