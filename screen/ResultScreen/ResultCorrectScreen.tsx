import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import QuizAnswer from '../../components/QuizAnswerComponent';
import Colorhukidashi from '../../components/ColorHukidashi';
import HukidashiCustom from '../../components/HukidashiComponent';
import ButtonCustom from '../../components/CustomButtonComponent';
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../route';

type Navigation = NavigationProp<StackParamList>;

export default function ResultCorrectScreen() {

  const navigation = useNavigation<Navigation>();
  const route = useRoute<RouteProp<StackParamList, 'ResultCorrect'>>();
  const { breadId } = route.params;

  return (
    <View style={styles.container}>
          <View style={styles.hukidashiTop}>
              <Colorhukidashi
                children='正解！'
                height={55} 
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

        <View style={styles.characterContainer}>
        <View style={{flex: 0, width: 30,}} />{/* 空白 */} 
             <Image 
                source={require("../../assets/hunter_Correct.png")} 
                style={styles.character} 
              /> 
            <View style={ styles.hukidasi }>
                <HukidashiCustom
                  height={80} 
                  width={180}
                  radius={5}
                  fontSize={18}  
                  justifyContent='center'
                  alignItems='center'
                >
                  やったな！{'\n'}また次も頼む
                </HukidashiCustom>
            </View>
            <View style={{flex: 0, width: 30,}} />{/* 空白 */}  
        </View>

        <ButtonCustom
          borderColor="#FF8628"
          borderWidth={5}
          color="#FBF7EF"
          height={50}
          onClick={() => navigation.navigate('Start')}
          radius={90}
          width={300}
          children="スタート画面に戻る" 
          fontSize={25}
          fontColor='#FF8628'
          justifyContent='center'
          alignItems='center'
        />
      
    </View>
  );
}

registerRootComponent(ResultCorrectScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E2CF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hukidashiTop: {
    marginTop: 20,
    marginBottom: 10,
  },
  characterContainer:{
    flex: 0,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center', 
    marginTop: 20,
    marginBottom: 20,
  },
  character: {
    flex: 1,
    width: 200,
    height: 200,
    alignSelf: 'center',
    alignItems: 'flex-end', // 要素を右揃え
    resizeMode: 'contain', 
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    zIndex: 999,
  },
  hukidasi:{
    flex: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start', 
    marginBottom: 50,
  },
});