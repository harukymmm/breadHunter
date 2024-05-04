import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { useFonts } from 'expo-font';


export default function QuizSelectScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'SmileySans-Oblique': require('../../assets/fonts/SmileySans-Oblique.otf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'SmileySans-Oblique', fontSize: 30}}>QuizSelectScreenです</Text>
      <Text style={{ fontSize: 30 }}>Platform Default</Text>
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