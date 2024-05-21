import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { useNavigation } from '@react-navigation/native';
import { StackParamList} from '../../route';
import { NavigationProp, useRoute, RouteProp } from '@react-navigation/native';

import ButtonCustom from "../../components/CustomButtonComponent";
import SelectFigComp from '../../components/CustomSelectComponent';
import HukidashiCustom from '../../components/HukidashiComponent'; 
import Colorhukidashi from '../../components/ColorHukidashi';
import ReturnButtonCustom from '../../components/ReturnButtonComponent';

type Navigation = NavigationProp<StackParamList>;


export default function QuizSelectScreen() {  
  
  const navigation = useNavigation<Navigation>();
  const route = useRoute<RouteProp<StackParamList, 'QuizSelect'>>();

  type IdsType = {
    idS: number;
    idA: number;
    idB: number;
  } | null;
  type BreadInfoType = {
    bread_info_S: string;
    bread_info_A: string;
    bread_info_B: string;
  };
  //ids:bread_idの引渡し
  const [ids, setIds] = useState<IdsType>(null);
  //const [bread_ids, setbread_ids] = useState<{ bread_id_S: number; bread_id_A: number, bread_id_B:number}>({ bread_id_S: 0, bread_id_A: 0, bread_id_B: 0 });
  //breadsの中身入れてるbread_S.explanation, bread_S.img, bread_S.shop_idでそれぞれ取れます
  const [bread_S, setbread_S] = useState(null);
  const [bread_A, setbread_A] = useState(null);
  const [bread_B, setbread_B] = useState(null);
  const [imgS, setImgS] = useState<any>(null);
  const [imgA, setImgA] = useState<any>(null);
  const [imgB, setImgB] = useState<any>(null);
  const [shop_S, setshop_S] = useState(null);
  const [shop_A, setshop_A] = useState(null);
  const [shop_B, setshop_B] = useState(null);


  ////////////////////////////////////数字のランダム生成と再生成//////////////////////////////
  // 使用された数値を追跡するための配列
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);
  // コンポーネントがマウントされた時に乱数を生成する
  useEffect(() => {
    console.log("gen ran num");
    generateRandomNumbers();
  }, []);

  //const [breadInfo, setBreadInfo] = useState(null);
  // 重複しないように3つの乱数を生成する関数
  const generateRandomNumbers = async() => {
    try {
      console.log("A");
      const response = await fetch('http://localhost:5001/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const count = await response.json();
      //ここに全てのDB要素を保存しておく
      //setIds(count.id);

      setbread_S(count.info.bread_info_S);
      setbread_A(count.info.bread_info_A);
      setbread_B(count.info.bread_info_B);
      setshop_S(count.shop.shop_S);
      setshop_A(count.shop.shop_A);
      setshop_B(count.shop.shop_B);

      const idS=count.id.bread_id_S;
      const idA=count.id.bread_id_A;
      const idB=count.id.bread_id_B;

      setIds({
        idS, 
        idA, 
        idB});
      console.log(ids);
      console.log(bread_S);
      console.log(bread_S?.img);
      console.log(shop_S);

        
    } catch (error) {
        console.error('Error fetching data:', error);
        // エラーハンドリングを行う
      }
  };
///////////////////////////////////////////////////////////////////////////////////////////



// ChangeColorButton の状態を管理する関数
const [isChangeColorButtonPressed, setIsChangeColorButtonPressed] = useState(false);
// BreadIdの状態を管理する関数
const [selectedBreadId, setSelectedBreadId] = useState<number | null>(null);
const [selectedShopla, setSelectedShopla] = useState<number | null>(null);
const [selectedShoplo, setSelectedShoplo] = useState<number | null>(null);

// START ボタンが押された時の処理
const handleStartButtonPress = () => {
  
  // ChangeColorButton が押された状態でなければ何もしない
  if (!isChangeColorButtonPressed) {
    console.log("ChangeColorButton must be pressed first!");
    return;
  }
  // ChangeColorButton が押された時の処理
  console.log("START button pressed!");
  // ここで画面遷移等の処理を追加する
  navigation.navigate('MapDefault', { breadId: selectedBreadId, latitude: selectedShopla,longitude: selectedShoplo,});
};

  return (
      <View style={styles.container}>
          <View style={styles.hukidashiTop}>
            <Colorhukidashi
              children='お題の選択'
              height={55} 
              width={500}
              radius={0}
              borderColor='#FF8628'
              borderWidth={3}
              color='#FBF7EF'
              fontSize={25} 
              fontColor='#FF8628'
              justifyContent='center'
              alignItems='center'
            />
          </View>
            <View style={styles.figContainerF}>
            
              <SelectFigComp
                onPress={() => 
                  navigation.navigate(
                    'QuizDetail',{breadId: ids?.idS, breadExp: bread_S?.explanation, breadImg: bread_S?.img,})
                }
                rank = "S"
                source={require('../../assets/testPan.jpeg')}
                //source={{uri:bread_S.img}}
                isChangeColorButtonPressed={isChangeColorButtonPressed} // ChangeColorButton の押された状態を渡す
                setIsChangeColorButtonPressed={setIsChangeColorButtonPressed} // ChangeColorButton の押された状態を更新する関数を渡す
                breadId={ids?.idS} // ランダムな数字を割り当てる
                breadExp={bread_S?.explanation}
                breadImg={bread_S?.img}
                setSelectedBreadId={setSelectedBreadId}
                setSelectedShopla={setSelectedShopla}
                setSelectedShoplo={setSelectedShoplo}
              />
            
                  <View style={styles.spaceW} />{/* 空白 */} 

              <SelectFigComp
                onPress={() => 
                  navigation.navigate(
                    'QuizDetail',{breadId: ids?.idA, breadExp: bread_A?.explanation, breadImg: bread_A?.img,})
                }
                rank = "A"
                //source={{uri:bread_A.img}}
                source={require('../../assets/testPan.jpeg')}
                isChangeColorButtonPressed={isChangeColorButtonPressed} // ChangeColorButton の押された状態を渡す
                setIsChangeColorButtonPressed={setIsChangeColorButtonPressed} // ChangeColorButton の押された状態を更新する関数を渡す
                breadId={ids?.idA} // ランダムな数字を割り当てる
                breadExp={bread_A?.explanation}
                breadImg={bread_A?.img}
                setSelectedBreadId={setSelectedBreadId}
                setSelectedShopla={shop_A?.latitude}
                setSelectedShoplo={shop_A?.longitude}
              />
            
            </View>

          <View style={styles.figContainerS}>
          
              <SelectFigComp
                onPress={() => 
                  navigation.navigate('QuizDetail',{breadId: ids?.idB, breadExp: bread_B?.explanation, breadImg: bread_B?.img,})
                }
                rank = "B"
                //source={{uri:bread_B?.img}}
                source={require('../../assets/testPan.jpeg')}
                isChangeColorButtonPressed={isChangeColorButtonPressed} // ChangeColorButton の押された状態を渡す
                setIsChangeColorButtonPressed={setIsChangeColorButtonPressed} // ChangeColorButton の押された状態を更新する関数を渡す
                breadId={ids?.idB} // ランダムな数字を割り当てる
                breadExp={bread_B?.explanation}
                breadImg={bread_B?.img}
                setSelectedBreadId={setSelectedBreadId}
                setSelectedShopla={shop_B?.latitude}
                setSelectedShoplo={shop_B?.longitude}
              />

              <View style={{flex: 0, width: 10}} />{/* 空白 */} 
          
            <View style={styles.character}>
              <HukidashiCustom
                height={60}
                width={180}
                radius={15}
                fontSize={15}
                justifyContent='center'
                alignItems='center'
              >
                気になるパンを選んでくれ{'\n'}探すのはその次だ
              </HukidashiCustom>
              
              <Image 
                source={require('../../assets/hunter_First.png')}
                style={{ width: 150, height: 200 }}
                resizeMode="contain"
              />

            </View>
           </View>

          <View style={styles.startButton}>
            <ReturnButtonCustom
                onClick={() => generateRandomNumbers()} // 乱数を再生成する関数を呼び出す
              />
            <View style={{flex: 0, width: 5}} />{/* 空白 */} 
            <ButtonCustom
              borderColor="#FC3B00"
              borderWidth={5}
              color="#FF8628"
              height={50}
              onClick={() => handleStartButtonPress()} // START ボタンが押されたときの処理
              radius={90}
              width={250}
              children="START" 
              fontSize={30}
              fontColor='#FBF7EF'
              justifyContent='center'
              alignItems='center'
            />
          </View>
     </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F3E2CF',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10, // 左右の余白を追加
  },
  hukidashiTop: {
    marginTop: 20,
    marginBottom: 10,
  },
  figContainerF: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap', //行を超える場合折り返す
    marginBottom: 20,
  },
  character: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end', // 右寄せ
    marginBottom: 0,
  },
  figContainerS: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', // 右寄せ
    flexWrap: 'wrap', //行を超える場合折り返す
    marginBottom: 0,
  },
  startButton: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  justifyContent: 'center', // 水平方向の中央に配置する
  marginBottom: 20,
  },
  spaceW: {
    flex: 0,
    width: 20,
  },
});