import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import ButtonCustom from "../../components/CustomButtonComponent";
import HukidashiCustom from '../../components/HukidashiComponent';

//Viewという要素を作ってそこにstyleを適用する
export default function TakePhotoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.redbox}></View>
      <View style={styles.orangebox}>
        <Text style={styles.headingtext}>写真判定</Text>
      </View>
      <View style={styles.graybox}>
      </View>
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
      パンを見つけたか！{'\n'}写真を撮ってくれ
      </HukidashiCustom>
      </View>
      <Image 
        source={require("../../assets/hunter_TakePhoto.png")} 
        style={styles.character} 
      />
      <View style={styles.buttoncontainer}>
      <ButtonCustom
        borderColor="#FF8628"
        borderWidth={5}
        color="#FF8628"
        height={230}
        onClick={() => console.log("You clicked on カメラ起動!")}
        radius={0}
        width={200}
        fontSize={25}
        fontColor='#FBF7EF'
        justifyContent='center'
        alignItems='center'
      >カメラを{'\n'}起動する
        </ButtonCustom>

      <ButtonCustom
        borderColor="#FBF7EF"
        borderWidth={5}
        color="#FBF7EF"
        height={230}
        onClick={() => console.log("You clicked on 前の画面に戻る")}
        radius={0}
        width={200}
        fontSize={25}
        fontColor='#FF8628'
        justifyContent='center'
        alignItems='center'
      >前の画面に{'\n'}戻る
      </ButtonCustom>
      </View>
      <View style={styles.checkButton}>
      <ButtonCustom
        borderColor="#FF8628"
        borderWidth={5}
        color="#FBF7EF"
        height={50}
        onClick={() => console.log("Push お題パンの確認")}
        radius={90}
        width={300}
        children="お題パンの確認" 
        fontSize={25}
        fontColor='#FF8628'
        justifyContent='center'
        alignItems='center'
      />
      </View>
      
    </View>
  );

}
//containerは背景 flexは重み比率 justifycontentはflexdirection方向(デフォ縦)に位置揃える
//alignitemsはflexdirection方向と別の軸（デフォ横）でそろえる
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F3E2CF',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  redbox:{
    flex: 0,
    backgroundColor: '#fc3b00',
    width: '100%',
    height: '3%'
  },
  orangebox:{
    flex: 0,
    flexDirection: 'row',
    backgroundColor: '#ff8628',
    width: '100%',
    height: '8.5%'
  },
  graybox:{
    flex: 0,
    backgroundColor: '#d6cfbd',
    width: '100%',
    height: '0.7%'
  },
  fukidashi:{
    flex: 0,
    marginTop: 20,
    marginBottom: 20,
  },
  character:{
    flex: 0,
    width: 350,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain', 
    marginBottom: 10,
  },
  headingtext:{
    color: '#fbf7ef',
    //alignselfで見出し文字の親オブジェクト（オレンジの四角形）に合わせてセンタリング
    alignSelf: 'center',
    marginLeft: '15%',
    fontSize: 20
  },
  buttoncontainer:{
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  justifyContent: 'center', // 水平方向の中央に配置する
  marginBottom: 15,
  },
  checkButton:{
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  justifyContent: 'center', // 水平方向の中央に配置する
  marginBottom: 20,
  }
});



registerRootComponent(TakePhotoScreen)