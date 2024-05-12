import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import ButtonCustom from "../../components/CustomButtonComponent";
import SelectFigComp from '../../components/CustomSelectComponent';
import HukidashiCustom from '../../components/HukidashiComponent';


export default function QuizSelectScreen() {  


  return (
      <View style={styles.container}>
          <View style={{flex: 0, height: 50,}} />{/* 空白 */} 
              <View style={styles.figContainerF}>
            
              <SelectFigComp
                onPress={() => console.log("You press Pan!")}
                rank = "S"
                source={require('../../assets/testPan.jpeg')}
                />
            
                  <View style={styles.spaceW} />{/* 空白 */} 

              <SelectFigComp
              onPress={() => console.log("You press Pan!")}
              rank = "A"
              source={require('../../assets/testPan.jpeg')}
              />
            
            </View>

          <View style={styles.figContainerS}>
          
            <SelectFigComp
            onPress={() => console.log("You press Pan!")}
            rank = "C"
            source={require('../../assets/testPan.jpeg')}
            />

              <View style={{flex: 0, width: 10}} />{/* 空白 */} 
          
            <View style={styles.character}>
              <HukidashiCustom
              height={60}
              width={180}
              radius={15}
              fontSize={15}
              fontColor='#332E21'
              justifyContent='center'
              alignItems='center'
              >
                気になるパンを選んでくれ{'\n'}探すのはその次だ
              </HukidashiCustom>
              
              <Image 
                source={require('../../assets/hunter_First.png')}
                style={{ width: 150, height: 200 }}
                resizeMode="contain"
                />

              </View>
            </View>

          <View style={styles.startButton}>
            <ButtonCustom
              borderColor="#FC3B00"
              borderWidth={5}
              color="#FF8628"
              height={50}
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
    justifyContent: 'flex-end',
    paddingHorizontal: 10, // 左右の余白を追加
  },

  figContainerF: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap', //行を超える場合折り返す
    marginBottom: 20,
  },
  character: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end', // 右寄せ
    marginBottom: 0,
  },
  figContainerS: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', // 右寄せ
    flexWrap: 'wrap', //行を超える場合折り返す
    marginBottom: 0,
  },
  startButton: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  justifyContent: 'center', // 水平方向の中央に配置する
  marginBottom: 20,
  },
  spaceW: {
    flex: 0,
    width: 20,
  },
});


registerRootComponent(QuizSelectScreen)