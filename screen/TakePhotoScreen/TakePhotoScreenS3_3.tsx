import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';

//Viewという要素を作ってそこにstyleを適用する
export default function TakePhotoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.redbox}></View>
      <View style={styles.orangebox}>
        <Text style={styles.headingtext}>写真判定</Text>
      </View>
      <View style={styles.graybox}></View>
      <Image 
       source={require("../../assets/S3_1_fukidashi.png")} 
        style={styles.fukidashi}
      />
      <Text style={styles.serif}>この写真を使うか？</Text>
      <Image 
        source={require("../../assets/hunter_Longmap.png")} 
        style={styles.character} 
      />
      <View style={styles.buttoncontainer}>
        <View style={styles.orangebutton}>
          <Button title="前の画面に戻る" onPress={() => console.log('Move to S3_2')}></Button>
        </View>
        <View style={styles.whitebutton}>
          <Button title="写真を参照" onPress={() => console.log('move to Photo folder')}></Button>
          </View>
      </View>
      <View style={styles.okbutton}>
          <Button title="OK!" onPress={() => console.log('Move to result')}></Button>
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
    position: 'absolute',
    top: '14%',
    height: '10%',
    width: '80%',
    alignSelf: 'center',
  },
  character:{
    position: 'absolute',
    top: '30%',
    left: '60%',
    height: '20%',
    width: '35%',
    aspectRatio: '738/620'
  },
  serif:{
    color:"#332e21",
    position: 'absolute',
    top: '16%',
    width: '60%',
    fontSize: 25,
    alignSelf: 'center',
  },
  headingtext:{
    color: '#fbf7ef',
    //alignselfで見出し文字の親オブジェクト（オレンジの四角形）に合わせてセンタリング
    alignSelf: 'center',
    marginLeft: '15%',
    fontSize: 20
  },
  buttoncontainer:{
    position: 'absolute',
    top: '75%',
    height: '17%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  orangebutton:{
    width: '30%',
    backgroundColor: '#ff8628',
    justifyContent: 'center'
  },
  whitebutton:{
    width: '30%',
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  okbutton:{
    position: 'absolute',
    top: '65%',
    alignSelf: 'center',
    height: '25%',
    width: '80%',
  },
});