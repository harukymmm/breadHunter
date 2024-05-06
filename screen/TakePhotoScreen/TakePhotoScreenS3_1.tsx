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
        source={require("../../assets/S3_1_character.png")} 
        style={styles.character} 
      />
      <Image 
       source={require("../../assets/S3_1_fukidashi.png")} 
        style={styles.fukidashi}
      />
      <Text style={styles.serif}>パンを見つけたか！写真を撮ってくれ</Text>
      <View style={styles.buttoncontainer}>
        <View style={styles.orangebutton}>
          <Button title="カメラを起動する" onPress={() => console.log('Move to S3_2')}></Button>
        </View>
        <View style={styles.whitebutton}>
          <Button title="前の画面に戻る" onPress={() => console.log('Move to S2')}></Button>
          </View>
      </View>
      <View style={styles.odaibutton}>
          <Button title="お題パンの確認" onPress={() => console.log('Move to S1')}></Button>
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
    top: '13%',
    width: '80%',
    aspectRatio: '446/137',
    alignSelf: 'center',
  },
  character:{
    position: 'absolute',
    top: '33%',
    width: '80%',
    aspectRatio: '446/188',
    alignSelf: 'center',
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
    top: '60%',
    height: '25%',
    width: '100%',
    flexDirection: 'row'
  },
  orangebutton:{
    flex: 1,
    backgroundColor: '#ff8628',
    justifyContent: 'center'
  },
  whitebutton:{
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  odaibutton:{
    position: 'absolute',
    top: '90%',
    alignSelf: 'center',
    height: '25%',
    width: '80%',
  },
});