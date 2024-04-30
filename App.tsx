import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>情報システム論実習breadHunter</Text>
      <Image source={require('./assets/App icon.png')} style={{width: 320, height: 320}} />
      <Button title="Start" onPress={() => console.log('Start')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
