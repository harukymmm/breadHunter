import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';

export default function QuizSelectScreen() {
  return (
    <View style={styles.container}>
      <Text>QuizSelectScreenです</Text>
      <Button title="Start" onPress={() => console.log('Start')} />
    </View>
  );
}

registerRootComponent(QuizSelectScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});