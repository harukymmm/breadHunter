import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import  ChooseBread from "../../components/ChooseBreadComponent";

export default function QuizDetailScreen() {
  
return (
  <View style={styles.container}>
    <View style={styles.spaceH} />{/* 空白 */}
    <ChooseBread
    source={require('../../assets/testPan.jpeg')}
    lunk= "ランクS"
    detail="ここにパンの説明が入ります"
    long={0.5}   //距離
    onPress={() => console.log("You press Close Bottun!")}
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