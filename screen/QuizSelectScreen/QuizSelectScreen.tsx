import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { useNavigation } from '@react-navigation/native';
import { QuizParamList } from './routeQuizSelect';
import { StackParamList} from '../../route'
import { NavigationProp } from '@react-navigation/native';

import ButtonCustom from "../../components/CustomButtonComponent";
import SelectFigComp from '../../components/CustomSelectComponent';
import HukidashiCustom from '../../components/HukidashiComponent'; 
import Colorhukidashi from '../../components/ColorHukidashi';

//遷移の型指定　P：フォルダ間の遷移　K：フォルダ内の遷移
type NavigationK = NavigationProp<QuizParamList>;
type NavigationP = NavigationProp<StackParamList>;

// データベースを開く
const db = await open({
  filename: 'TEST.DB',//場所を指定しなければならない
  driver: sqlite3.Database
});


export default function QuizSelectScreen() {  
  //Pはフォルダ間の遷移、Kはフォルダ内の遷移
  const navigationK = useNavigation<NavigationK>();
  const navigationP = useNavigation<NavigationP>();
  
　//DBから各ランクの個数を取ってくる numS, numA, numBはそれぞれのランクの持つカラム数
  try {
    // SQLクエリを実行して、結果を取得
    const reS = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM rankS');
    console.log('The number of records in the rankS table is:', reS);
    const reA = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM rankA');
    console.log('The number of records in the rankA table is:', reA);
    const reB = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM rankB');
    console.log('The number of records in the rankB table is:', reB);
    // number型に変更
    const numS: number = reS.count;
    const numA: number = reA.count;
    const numB: number = reB.count;

} catch (error) {
    console.error('Error fetching data:', error);
    throw error; // エラーを呼び出し元に再度スロー
} 


  ////////////////////////////////////数字のランダム生成と再生成/////////////////////////////
  // 0からnまでのランダムな整数を生成する関数->つまりrankの個数に応じたランダム整数を生成////////////
  const generateUniqueRandomNumber = (usedNumbers: number[], n: number): number => {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * n + 1);
    } while (usedNumbers.includes(randomNumber));
    return randomNumber;
  };
  // 使用された数値を追跡するための配列
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);
  // コンポーネントがマウントされた時に乱数を生成する
  useEffect(() => {
    generateRandomNumbers();
  }, []);
  // 重複しないように3つの乱数を生成する関数
  const generateRandomNumbers = () => {
    const breadIdS = generateUniqueRandomNumber(usedNumbers, numS);
    const breadIdA = generateUniqueRandomNumber(usedNumbers, numA); // breadIdAと重複しないように→テーブル異なるので、重複OKに変更してます
    const breadIdB = generateUniqueRandomNumber(usedNumbers, numB); 
    // 生成した乱数を配列に追加
    setUsedNumbers([breadIdS, breadIdA, breadIdB]);
  };
///////////////////////////////////////////////////////////////////////////////////////////


// ChangeColorButton の状態を管理する関数
const [isChangeColorButtonPressed, setIsChangeColorButtonPressed] = useState(false);
// BreadIdの状態を管理する関数
//selectedBreadId breadtable id
const [selectedBreadId, setSelectedBreadId] = useState<number | null>(null);

////////////////////////// DBから要素を取ってくる関数//////////////////////////////
try {
  // 各ランクの指定されたidのbread_idをrankS・rankA・rankBテーブルから取ってくる
  const bread_id_S = await db.get('SELECT bread_id FROM rankS WHERE id = ?', [setUsedNumbers[0]]);
  const bread_id_A = await db.get('SELECT bread_id FROM rankA WHERE id = ?', [setUsedNumbers[1]]);
  const bread_id_B = await db.get('SELECT bread_id FROM rankB WHERE id = ?', [setUsedNumbers[2]]);

  //bread_idをキーとして、breadテーブルからshop_idとimg、explanationを取ってくる
  const bread_S = await db.get<{ shop_id: number, img: string, explanation: string }>(
    'SELECT shop_id, img, explanation FROM breads WHERE id = ?',[bread_id_S]
);
  const bread_A = await db.get<{ shop_id: number, img: string, explanation: string }>(
    'SELECT shop_id, img, explanation FROM breads WHERE id = ?',[bread_id_A]
  );
  const bread_B = await db.get<{ shop_id: number, img: string, explanation: string }>(
    'SELECT shop_id, img, explanation FROM breads WHERE id = ?',[bread_id_B]
  );

  // 結果を適切な変数に格納
  const shop_S: number = bread_S.shop_id;
  const img_S: string = bread_S.img;
  const explanation_S: string = bread_S.explanation;
  const shop_A: number = bread_A.shop_id;
  const img_A: string = bread_A.img;
  const explanation_A: string = bread_A.explanation;
  const shop_B: number = bread_B.shop_id;
  const img_B: string = bread_B.img;
  const explanation_B: string = bread_B.explanation;

  // 結果を出力
  console.log('Name_S:', shop_S);
  console.log('Image_S:', img_S);
  console.log('Explanation_S:', explanation_S);
  console.log('Shop_A:', shop_A);
  console.log('Image_A:', img_A);
  console.log('Explanation_A:', explanation_A);
  console.log('Shop_B:', shop_B);
  console.log('Image_B:', img_B);
  console.log('Explanation_B:', explanation_B);

} catch (error) {
  console.error('Error fetching data:', error);
} finally {
  // データベースを閉じる
  await db.close();
}
///////////////////////////////////////////////////////////////////////////

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
  navigationP.navigate('Map', { breadId: selectedBreadId })
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
                  navigationK.navigate(
                    'QuizDetail',{breadId: usedNumbers[0],})
                }
                rank = "S"
                source={require('../../assets/testPan.jpeg')}
                isChangeColorButtonPressed={isChangeColorButtonPressed} // ChangeColorButton の押された状態を渡す
                setIsChangeColorButtonPressed={setIsChangeColorButtonPressed} // ChangeColorButton の押された状態を更新する関数を渡す
                breadId={usedNumbers[0]} // ランダムな数字を割り当てる
                setSelectedBreadId={setSelectedBreadId}
              />
            
                  <View style={styles.spaceW} />{/* 空白 */} 

              <SelectFigComp
                onPress={() => 
                  navigationK.navigate(
                    'QuizDetail',{breadId: usedNumbers[1],})
                }
                rank = "A"
                source={require('../../assets/testPan.jpeg')}
                isChangeColorButtonPressed={isChangeColorButtonPressed} // ChangeColorButton の押された状態を渡す
                setIsChangeColorButtonPressed={setIsChangeColorButtonPressed} // ChangeColorButton の押された状態を更新する関数を渡す
                breadId={usedNumbers[1]} // ランダムな数字を割り当てる
                setSelectedBreadId={setSelectedBreadId}
              />
            
            </View>

          <View style={styles.figContainerS}>
          
              <SelectFigComp
                onPress={() => 
                  navigationK.navigate('QuizDetail',{breadId: usedNumbers[2],})
                }
                rank = "C"
                source={require('../../assets/testPan.jpeg')}
                isChangeColorButtonPressed={isChangeColorButtonPressed} // ChangeColorButton の押された状態を渡す
                setIsChangeColorButtonPressed={setIsChangeColorButtonPressed} // ChangeColorButton の押された状態を更新する関数を渡す
                breadId={usedNumbers[2]} // ランダムな数字を割り当てる
                setSelectedBreadId={setSelectedBreadId}
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
            <ButtonCustom
                borderColor="#FF8628"
                borderWidth={5}
                color='#FBF7EF'
                height={50}
                onClick={() => generateRandomNumbers()} // 乱数を再生成する関数を呼び出す
                radius={90}
                width={50}
                children="" 
                fontSize={30}
                fontColor='#FBF7EF'
                justifyContent='center'
                alignItems='center'
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


registerRootComponent(QuizSelectScreen)