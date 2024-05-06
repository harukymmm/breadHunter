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
      <Button title="Start" onPress={() => console.log('Start')} />
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
    alignItems: 'center',
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
  headingtext:{
    color: '#fbf7ef',
    //alignselfで見出し文字の親オブジェクト（オレンジの四角形）に合わせてセンタリング
    alignSelf: 'center',
    marginLeft: '15%',
    fontSize: 20
  },
  black:{
    color: '#332e21',
  }
});