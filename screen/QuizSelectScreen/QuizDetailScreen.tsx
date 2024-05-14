import React from 'react';
import { StyleSheet, View } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import  ChooseBread from "../../components/ChooseBreadComponent";

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { QuizParamList } from './routeQuizSelect'
import { NavigationProp } from '@react-navigation/native';

type NavigationK = NavigationProp<QuizParamList>;

export default function QuizDetailScreen() {
  const navigationK = useNavigation<NavigationK>();
  //QuizSelectScreenから渡された変数breadId
  const route = useRoute();
  const { breadId } = route.params;
  
return (
  <View style={styles.container}>

    <View style={styles.spaceH} />{/* 空白 */}

      <ChooseBread
          source={require('../../assets/testPan.jpeg')}
          rank= {breadId.toString()}  //rank内にbreadIdを表示（応急処置）
          detail="ここにパンの説明が入ります"
          onPress={() => navigationK.navigate('QuizSelect')}
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