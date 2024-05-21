#importのやり方例（後で消していいファイルです）
#ImgRecogフォルダ外部からClassifyBreadImg関数を使うときはImgRecogフォルダまでの相対パスを通してください
import sys
sys.dont_write_bytecode = True
sys.path.append('python/ImgRecogまでの相対パス')

from Forward import ClassifyBreadImg

#ClassifyBreadImg関数を使うとForwardImgフォルダに入れた画像の予測クラスを返してくれます
result=ClassifyBreadImg()

print(str(result))