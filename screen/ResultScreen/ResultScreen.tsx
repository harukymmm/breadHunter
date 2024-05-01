import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { useNavigation } from '@react-navigation/native';

export default function ResultScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>ResultScreenです</Text>
      <Button title="Start" onPress={() => console.log('Start')} />
    </View>
  );
}

registerRootComponent(ResultScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});