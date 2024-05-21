import React from 'react';
import { StyleSheet, View } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import  ChooseBread from "../../components/ChooseBreadComponent";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { StackParamList } from '../../route';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type Navigation = NavigationProp<StackParamList>;

export default function QuizDetailScreen() {
  
  const navigation = useNavigation<Navigation>();
  //QuizSelectScreenから渡された変数breadId
  const route = useRoute<RouteProp<StackParamList, 'QuizDetail'>>();
  const { breadId, breadExp, breadImg } = route.params;
  
return (
  <View style={styles.container}>

    <View style={styles.spaceH} />{/* 空白 */}

      <ChooseBread
          source={require('../../assets/testPan.jpeg')}
          rank= {breadId.toString()}  //rank内にbreadIdを表示（応急処置）
          detail={breadExp.toString()}
          onPress={() => navigation.navigate('QuizSelect')}
      ></ChooseBread>

  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  spaceH: {
    flex: 0,
    height: 50,
  }
});

registerRootComponent(QuizDetailScreen);