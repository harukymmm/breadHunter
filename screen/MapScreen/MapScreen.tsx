import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';

export default function MapScreen() {
  return (
    <View style={styles.container}>
       <Image 
        source={require("./bread_UI1.png")} 
        style={{width: 200, height: 200, position: 'absolute', right: 10, bottom: 10 }} 
       /> 
       <Image 
        source={require("./bread_UI2.png")} 
        style={{width: 400, height: 400, position: 'absolute', right: 16, bottom: 350 }} 
       /> 
      <Text style={{fontSize:30, position: 'absolute', top: 745, left: 30}}>パンまであと</Text>
      <Text style={{fontSize:30, position: 'absolute', top: 780, left: 30}}>Xkmだ！</Text>
      <View style={{position:'absolute', bottom: 300, right:　170}}>
        <Button title="現在地更新" onPress={() => console.log('更新しました')}/>
      </View>
      <View style={ styles.buttonContainer }>
        <Button title="パン選択に戻る" onPress={() => console.log('Start')} />
      </View>
    </View>
  );
}

registerRootComponent(MapScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7d0a9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  buttonContainer: {
    position: 'absolute',
    left: 30,
    bottom: 30, // 下端に配置
  },
});