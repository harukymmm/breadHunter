import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import QuizAnswer from '../../components/QuizAnswerComponent';
import Colorhukidashi from '../../components/ColorHukidashi';

export default function ResultScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.hukidashi}>
        <Colorhukidashi
              children='正解！'
              height={50} 
              width={500}
              radius={0}
              borderColor=''
              borderWidth={0}
              color='#FF8628'
              fontSize={25} 
              fontColor='#FBF7EF'
              justifyContent='center'
              alignItems='center'
            />
            </View>
      <QuizAnswer
      imageSource = {require('../../assets/testPan.jpeg')}
      breadPlace = "ルンダンショコラ白梅町店"
      breadName = "ゴルゴンゾーラトマト"
      judgeImage={require('../../assets/symbol_Complete.png')}
      />
    </View>
  );
}

registerRootComponent(ResultScreen);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#F3E2CF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hukidashi: {
    marginTop: 20,
    marginBottom: 10,
  }
});