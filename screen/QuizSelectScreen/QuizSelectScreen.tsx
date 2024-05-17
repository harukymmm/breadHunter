import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { useNavigation } from '@react-navigation/native';
import { StackParamList} from '../../route'
import { NavigationProp, useRoute, RouteProp } from '@react-navigation/native';

import ButtonCustom from "../../components/CustomButtonComponent";
import SelectFigComp from '../../components/CustomSelectComponent';
import HukidashiCustom from '../../components/HukidashiComponent'; 
import Colorhukidashi from '../../components/ColorHukidashi';
import ReturnButtonCustom from '../../components/ReturnButtonComponent';

type Navigation = NavigationProp<StackParamList>;


export default function QuizSelectScreen() {  
  //Pはフォルダ間の遷移、Kはフォルダ内の遷移
  const navigation = useNavigation<Navigation>();
  const route = useRoute<RouteProp<StackParamList, 'QuizSelect'>>();

  ////////////////////////////////////数字のランダム生成と再生成//////////////////////////////
  // 0から999までのランダムな整数を生成する関数
  const generateUniqueRandomNumber = (usedNumbers: number[]): number => {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 1000);
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
    const breadIdA = generateUniqueRandomNumber(usedNumbers);
    const breadIdB = generateUniqueRandomNumber(usedNumbers.concat(breadIdA)); // breadIdAと重複しないように
    const breadIdC = generateUniqueRandomNumber(usedNumbers.concat(breadIdA, breadIdB)); // breadIdAとbreadIdBと重複しないように
    // 生成した乱数を配列に追加
    setUsedNumbers([breadIdA, breadIdB, breadIdC]);
  };
///////////////////////////////////////////////////////////////////////////////////////////


// ChangeColorButton の状態を管理する関数
const [isChangeColorButtonPressed, setIsChangeColorButtonPressed] = useState(false);
// BreadIdの状態を管理する関数
const [selectedBreadId, setSelectedBreadId] = useState<number | null>(null);

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
  navigation.navigate('MapDefault', { breadId: selectedBreadId })
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
                  navigation.navigate(
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
                  navigation.navigate('QuizDetail',{breadId: usedNumbers[2],})
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