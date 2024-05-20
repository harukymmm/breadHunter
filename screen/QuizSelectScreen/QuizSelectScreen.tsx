import * as SQLite from 'expo-sqlite/next';
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
//chatGPT曰くSQLite.openDatabase()らしい？


export default function QuizSelectScreen() {  
  const dbPath = '../../DB/test/TEST.db'
  try{
    const db = SQLite.openDatabaseAsync(dbPath)
    console.log('Database opened successfully');
  }catch(error){
    console.error('Error opening database:', error);
  }
  //正しく開くことができている
  const db = SQLite.openDatabaseAsync(dbPath);
  const navigation = useNavigation<Navigation>();
  const route = useRoute<RouteProp<StackParamList, 'QuizSelect'>>();
  ////////////////////////////////////数字のランダム生成と再生成/////////////////////////////
  // 0からnまでのランダムな整数を生成する関数->つまりrankの個数に応じたランダム整数を生成////////////
  const generateUniqueRandomNumber = (usedNumbers: number[], n: number): number => {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * n + 1);
    } while (usedNumbers.includes(randomNumber));
    return randomNumber;
  };

  // 使用された数値を追跡するための配列　usedNumbers→ランダム数を格納　breadIds→rank○テーブルのidを格納
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);
  const [Ids, setIds] = useState<{ IdS: number; IdA: number; IdB: number } | null>(null);
　const [bread_ids, setbread_ids] = useState<{ bread_id_S: number; bread_id_A: number, bread_id_B:number}>({ bread_id_S: 0, bread_id_A: 0, bread_id_B: 0 });
  const [bread_S, setbread_S] = useState<{shop_id: number, img: string, explanation: string} | null>(null);
  const [bread_A, setbread_A] = useState<{shop_id: number, img: string, explanation: string} | null>(null);
  const [bread_B, setbread_B] = useState<{shop_id: number, img: string, explanation: string} | null>(null);

  // コンポーネントがマウントされた時に乱数を生成する
  useEffect(() => {
    generateRandomNumbers();
  }, []);

  const generateRandomNumbers = async() => {
    try{
        // SQLクエリを実行して、各ランクの個数を取得→ここから動かない。書き方が違う？
        const reS = (await db).getFirstSync('SELECT COUNT(*) as count FROM rankS');
        const reA = (await db).getFirstSync('SELECT COUNT(*) as count FROM rankA');
        const reB = (await db).getFirstSync('SELECT COUNT(*) as count FROM rankB');
        console.log('reS');
        // number型に変更　numS, numA, numBはそれぞれのランクの個数 gptとhpで言ってることが違う
        const numS = (reS as { count: number }).count;
        const numA = (reA as { count: number }).count;
        const numB = (reB as { count: number }).count;
        
        // ID 表示するidを生成　rankSのIdS番目を取ってくるという意味
        const IdS = generateUniqueRandomNumber(usedNumbers, numS);
        const IdA = generateUniqueRandomNumber(usedNumbers, numA); 
        const IdB = generateUniqueRandomNumber(usedNumbers, numB);
        console.log(IdS, IdA, IdB)

        // 生成した乱数を配列に追加
        setIds({ IdS, IdA, IdB });

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // エラーを呼び出し元に再度スロー
    }
};
///////////////////////////////////////////////////////////////////////////////////////////


// ChangeColorButton の状態を管理する関数
const [isChangeColorButtonPressed, setIsChangeColorButtonPressed] = useState(false);

const [selectedBreadId, setSelectedBreadId] = useState<number | null>(null);

// breadIdsが変更されたとき(つまり表示するパンが決定した時)のみ行う
useEffect(() => {
  
  if (Ids) {
    fetchBreadDetails();
  }
}, [Ids]);

////////////////////////// DBから要素を取ってくる関数//////////////////////////////
const fetchBreadDetails = async() =>{
  if (!Ids) return;
  try {
    // 各ランクの指定されたidのbread_idをrankS・rankA・rankBテーブルから取ってくる
    // breadIdSに対応したbread_idを取ってくる
    const bread_id_S_result = await (await db).getFirstAsync<{ bread_id: number }>('SELECT bread_id FROM rankS WHERE id = ?', [Ids.IdS]);
    const bread_id_A_result = await (await db).getFirstAsync<{ bread_id: number }>('SELECT bread_id FROM rankA WHERE id = ?', [Ids.IdA]);
    const bread_id_B_result = await (await db).getFirstAsync<{ bread_id: number }>('SELECT bread_id FROM rankB WHERE id = ?', [Ids.IdB]);
    
    const bread_id_S = bread_id_S_result ? bread_id_S_result.bread_id : 0;
    const bread_id_A = bread_id_A_result ? bread_id_A_result.bread_id : 0;
    const bread_id_B = bread_id_B_result ? bread_id_B_result.bread_id : 0;    

    setbread_ids({ bread_id_S, bread_id_A, bread_id_B});

  //bread_idに対応したshop_id、imgファイルの指定、explanationを取ってきて、bread_にまとめる
  const bread_info_S = (await (await db).getFirstAsync<{ shop_id: number, img: string, explanation: string }>(
    'SELECT shop_id, img, explanation FROM breads WHERE id = ?', [bread_id_S]
  ))?? { shop_id: 0, img: '', explanation: '' };
  const bread_info_A = (await (await db).getFirstAsync<{ shop_id: number, img: string, explanation: string }>(
    'SELECT shop_id, img, explanation FROM breads WHERE id = ?', [bread_id_A]
  ))?? { shop_id: 0, img: '', explanation: '' };
  const bread_info_B = (await (await db).getFirstAsync<{ shop_id: number, img: string, explanation: string }>(
    'SELECT shop_id, img, explanation FROM breads WHERE id = ?', [bread_id_B]
  ))?? { shop_id: 0, img: '', explanation: '' };

  //コンソールで確認
  console.log('Shop_S:', bread_info_S.shop_id);
  console.log('Image_S:', bread_info_S.img);
  console.log('Explanation_S:', bread_info_S.explanation);
  console.log('Shop_A:', bread_info_A.shop_id);
  console.log('Image_A:', bread_info_A.img);
  console.log('Explanation_A:', bread_info_A.explanation);
  console.log('Shop_B:', bread_info_B.shop_id);
  console.log('Image_B:', bread_info_B.img);
  console.log('Explanation_B:', bread_info_B.explanation);

  setbread_S({ shop_id: bread_info_S?.shop_id ?? 0, img: bread_info_S?.img ?? '', explanation: bread_info_S?.explanation ?? '' });
  setbread_A({ shop_id: bread_info_A?.shop_id ?? 0, img: bread_info_A?.img ?? '', explanation: bread_info_A?.explanation ?? '' });
  setbread_B({ shop_id: bread_info_B?.shop_id ?? 0, img: bread_info_B?.img ?? '', explanation: bread_info_B?.explanation ?? '' });



} catch (error) {
  console.error('Error fetching data:', error);
}
};

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
                    'QuizDetail',{breadId: bread_ids?.bread_id_S})

                }
                rank = "S"
                //ここのコード自信ない。bread_S.imgの変数の中身がパスになっている。もしかしたらbread_S.imgのパスがうまく通らないかも
                //source={require(bread_S.img)}
                source={require('../../assets/testPan.jpeg')}
                isChangeColorButtonPressed={isChangeColorButtonPressed} // ChangeColorButton の押された状態を渡す
                setIsChangeColorButtonPressed={setIsChangeColorButtonPressed} // ChangeColorButton の押された状態を更新する関数を渡す

                //breadIdとsetSecectedBreadIdの違いがわからない、どちらかだけでいい気がするがどうなのだろう
                breadId={bread_ids?.bread_id_S}// bread_idsからbread_id_SをbreadIdに割り当てる
                setSelectedBreadId={setSelectedBreadId}
              />
            
                  <View style={styles.spaceW} />{/* 空白 */} 

              <SelectFigComp
                onPress={() => 

                  navigation.navigate(
                    'QuizDetail',{breadId: bread_ids?.bread_id_A}
                  )

                }
                rank = "A"
                //source={require(bread_A.img)}
                source={require('../../assets/testPan.jpeg')}
                isChangeColorButtonPressed={isChangeColorButtonPressed} // ChangeColorButton の押された状態を渡す
                setIsChangeColorButtonPressed={setIsChangeColorButtonPressed} // ChangeColorButton の押された状態を更新する関数を渡す
                breadId={bread_ids?.bread_id_A}// bread_idsからbread_id_AをbreadIdに割り当てる
                setSelectedBreadId={setSelectedBreadId}
              />
            
            </View>

          <View style={styles.figContainerS}>
          
              <SelectFigComp
                onPress={() => 

                  navigation.navigate(
                    'QuizDetail',{breadId: bread_ids?.bread_id_B}
                  )

                }
                rank = "B"
                //source={require(bread_B.img)}
                source={require('../../assets/testPan.jpeg')}
                isChangeColorButtonPressed={isChangeColorButtonPressed} // ChangeColorButton の押された状態を渡す
                setIsChangeColorButtonPressed={setIsChangeColorButtonPressed} // ChangeColorButton の押された状態を更新する関数を渡す
                breadId={bread_ids?.bread_id_B}// bread_idsからbread_id_BをbreadIdに割り当てる
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


registerRootComponent(QuizSelectScreen)