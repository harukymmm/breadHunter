import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { useNavigation } from '@react-navigation/native';

export default function MapScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>MapScreenです</Text>
      <Button title="Start" onPress={() => console.log('Start')} />
    </View>
  );
}

registerRootComponent(MapScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});