import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import HukidashiCustom from '../../components/HukidashiComponent';
import ButtonCustom from "../../components/CustomButtonComponent";

//Viewという要素を作ってそこにstyleを適用する
export default function TakePhotoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.redbox}></View>
      <View style={styles.orangebox}>
        <Text style={styles.headingtext}>写真判定</Text>
      </View>
      <View style={styles.graybox}></View>
      <View style={styles.fukidashi}>
        <HukidashiCustom
        height={90}
        width={250}
        radius={15}
        fontSize={20}
        fontColor='#332E21'
        justifyContent='center'
        alignItems='center'
        >
        この写真を使うか?
        </HukidashiCustom>
      </View>
      <View style={styles.images}>
      <Image
        source={require('../../assets/testPan.jpeg')}
        style={styles.bread}
        />
      <Image
        source={require("../../assets/hunter_Check.png")} 
        style={styles.character}
         />
      </View>
      <View style={styles.okbutton}>
        <ButtonCustom
        borderColor='#fc3b00'
        borderWidth={5}
        color="#FBF7EF"
        height={80}
        onClick={() => console.log("Push OKボタン")}
        radius={90}
        width={300}
        children="OK!" 
        fontSize={25}
        fontColor='#fc3b00'
        justifyContent='center'
        alignItems='center'
      />
      </View>
        <View style={styles.buttoncontainer}>
        <ButtonCustom
        borderColor="#FF8628"
        borderWidth={5}
        color="#FBF7EF"
        height={120}
        onClick={() => console.log("Push 戻るボタン")}
        radius={45}
        width={120}
        children="戻る" 
        fontSize={25}
        fontColor='#FF8628'
        justifyContent='center'
        alignItems='center'
      />
      <View style={{flex: 0, width: 10}} />{/* 空白 */} 
      <ButtonCustom
        borderColor="#FF8628"
        borderWidth={5}
        color="#FBF7EF"
        height={120}
        onClick={() => console.log("Push ライブラリボタン")}
        radius={45}
        width={120}
        children="ライブラリから選択" 
        fontSize={25}
        fontColor='#FF8628'
        justifyContent='center'
        alignItems='center'
      />
      
      </View>
    </View>
  );
}

registerRootComponent(TakePhotoScreen);

//containerは背景 flexは重み比率 justifycontentはflexdirection方向(デフォ縦)に位置揃える
//alignitemsはflexdirection方向と別の軸（デフォ横）でそろえる
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e2cf',
  },
  redbox:{
    backgroundColor: '#fc3b00',
    width: '100%',
    height: '3%'
  },
  orangebox:{
    flexDirection: 'row',
    backgroundColor: '#ff8628',
    width: '100%',
    height: '8.5%'
  },
  graybox:{
    backgroundColor: '#d6cfbd',
    width: '100%',
    height: '0.7%'
  },
  fukidashi:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // 水平方向の中央に配置する
    marginTop: 0,
    marginBottom: 25,
  },
  images:{
    flex: 0,
    width: 350,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain', 
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginBottom: 15,
  },
  bread:{
    flex: 0,
    width: 230,
    height: 230,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginBottom: 20,
  },
  character:{
    flex: 0,
    width: 100,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain', 
    flexDirection: 'column',
    justifyContent: 'flex-end', 
    marginBottom: 0,
  },
  headingtext:{
    color: '#fbf7ef',
    //alignselfで見出し文字の親オブジェクト（オレンジの四角形）に合わせてセンタリング
    alignSelf: 'center',
    marginLeft: '15%',
    fontSize: 20
  },

  orangebutton:{
    width: '30%',
    backgroundColor: '#ff8628',
    justifyContent: 'center'
  },
  okbutton:{
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // 水平方向の中央に配置する
    marginBottom: 15,
  },
  buttoncontainer:{
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 水平方向の中央に配置する
    marginBottom: 15,
  },
});