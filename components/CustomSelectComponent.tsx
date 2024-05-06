import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import ButtonCustom from './CustomButtonComponent'
import { useFonts } from 'expo-font';

interface Props {
    onPress: () => void;
    lunk?: React.ReactNode;
    source: any;
}

const SelectFigComp = ({onPress, lunk, source}: Props) => {
    
    const [fontsLoaded, fontError] = useFonts({
        'SmileySans-Oblique': require('../assets/fonts/SmileySans-Oblique.otf'),
      });
      if (!fontsLoaded && !fontError) {
        return null;
      }
    
     const styles = StyleSheet.create({
        lunkText: {
            fontFamily: 'SmileySans-Oblique',
            fontSize: 25,
            color: '#332E21',
            textAlign: 'center',
        },
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#FBF7EF', //背景色
            borderColor: '#FBF7EF', // 白色の背景枠
            borderWidth: 5, // 枠の太さ
              },
        space: {
            flex: 0,
            height: 5
              }
        });

    return (
      <View style={styles.container}>
      <Text style= {styles.lunkText}>{lunk}</Text>
        <TouchableOpacity onPress={onPress}>
            <Image 
            source={source}  //画像のソースをpropsから受け取る
            style={{ width: 150, height: 150}}
            />
        </TouchableOpacity>
        <View style={styles.space} />{/* 空白 */}
      <ButtonCustom
      borderColor="#FF8628"
      borderWidth={5}
      color="#FBF7EF"
      height={35}
      onClick={() => console.log("You clicked on the miniButton!")}
      radius={90}
      width={35}
      children="" 
      justifyContent='center'
      alignItems='center'
      />
      
      </View>
    );
  }

  
  export default SelectFigComp;
