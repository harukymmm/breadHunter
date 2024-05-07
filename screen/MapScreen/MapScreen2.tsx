import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';

export default function MapScreen() {
  return (
    <View style={styles.container}>
       <Image 
        source={require("../../assets/breadicon.png")} 
        style={{width: 200, height: 200, position: 'absolute', left: 10, bottom: 10 }} 
       /> 
       <Image 
        source={require("../../assets/hunter_Nearmap.png")} 
        style={{width: 400, height: 400, position: 'absolute', right: 16, bottom: 350 }} 
       /> 
      <Text style={{fontSize:30, position: 'absolute', bottom: 250, right: 30}}>この中のどこかにパンが！</Text>
      <View style={{width: 120, position:'absolute', bottom: 150, right:30}}>
        <Button title="パン発見!" onPress={() => console.log('更新しました')}/>
      </View>
      <View style={{width: 120, position:'absolute', bottom: 100, right:30}}>
        <Button title="諦めるか…" onPress={() => console.log('更新しました')}/>
      </View>
    </View>
  );
}

registerRootComponent(MapScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e2cf',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
});