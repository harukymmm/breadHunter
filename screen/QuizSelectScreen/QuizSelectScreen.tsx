import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import ButtonCustom from "../../components/CustomButtonComponent";
import SelectFigComp from '../../components/CustomSelectComponent';


export default function QuizSelectScreen() {  


  return (
      <View style={styles.container}>
       <View style={{flex: 0, height: 50,}} />{/* 空白 */} 
      
      <View style={styles.figContainerF}>
        <View style={styles.spaceW} />{/* 空白 */}
        <SelectFigComp
         onPress={() => console.log("You press Pan!")}
         rank = "ランクS"
         source={require('../../assets/testPan.jpeg')}
         />
         <View style={styles.spaceW} />{/* 空白 */}
        <SelectFigComp
         onPress={() => console.log("You press Pan!")}
         rank = "ランクA"
         source={require('../../assets/testPan.jpeg')}
         />
         <View style={styles.spaceW} />{/* 空白 */}
      </View>

      <View style={styles.figContainerS}>
        <View style={styles.spaceW} />{/* 空白 */} 
        <SelectFigComp
         onPress={() => console.log("You press Pan!")}
         rank = "ランクC"
         source={require('../../assets/testPan.jpeg')}
         />
         <View style={styles.spaceW} />{/* 空白 */} 
         <Image 
          source={require('../../assets/hunter_First.png')}
          style={{ width: 158, height: 200 }}
          />
          <View style={styles.spaceW} />{/* 空白 */} 
          
        <View style={{flex: 0, height: 40,}} />{/* 空白 */} 
      </View>

     <View style={styles.startButton}>
      <ButtonCustom
        borderColor="#FC3B00"
        borderWidth={5}
        color="#FF8628"
        height={70}
        onClick={() => console.log("You clicked on the START!")}
        radius={90}
        width={250}
        children="START" 
        fontSize={30}
        fontColor='#FBF7EF'
        justifyContent='center'
        alignItems='center'
      />
     </View>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F3E2CF',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  figContainerF: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap', //行を超える場合折り返す
    marginBottom: 20,
  },
  figContainerS: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap', //行を超える場合折り返す
    marginBottom: 20,
  },
  startButton: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  justifyContent: 'center', // 水平方向の中央に配置する
  marginBottom: 0,
  },
  spaceW: {
    flex: 0,
    width: 20,
  },
});


registerRootComponent(QuizSelectScreen)