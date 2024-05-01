import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../route';
import { NavigationProp } from '@react-navigation/native';

type Navigation = NavigationProp<StackParamList>;

export default function StartScreen() {
  const navigation = useNavigation<Navigation>();
  const { width, height } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <Image source={require('./StartScreenImage.jpg')} style={{width: width, height: height}} />
      <View style={styles.overlay}>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('QuizSelect')}
        >
          <Text style={{color: 'black', fontSize: 30}}>Start</Text>
        </TouchableOpacity>
      </View>
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
  overlay: {
    position: 'absolute',
    top: 205,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 170, 
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'black',
  }
});
