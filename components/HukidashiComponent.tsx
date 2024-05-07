//ふきだしを実装するコンポーネント

import React from "react";
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useFonts } from 'expo-font';

interface Props {
    children?: React.ReactNode;   //テキスト文字情報
    height: number;       //高さ
    width: number;         //幅
    radius: number;        //角の丸さ
    fontSize: number;     //フォントサイズ
    fontColor: string;    //フォントの色
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

const HukidashiCustom = ({ 
   children, height, width, radius, fontSize, fontColor, justifyContent, alignItems}: Props) => {
    
    const [fontsLoaded, fontError] = useFonts({
        'SmileySans-Oblique': require('../assets/fonts/SmileySans-Oblique.otf'),
      });
      if (!fontsLoaded && !fontError) {
        return null;
      }
    const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FBF7EF",
        height: height,
        width: width,
        borderRadius: radius,
        justifyContent: justifyContent,
        alignItems: alignItems,
        flexDirection: 'column',
        padding: 10, // 必要に応じてパディング（内側の余白）を追加
      },
    });
  
    return (
      <View style = {styles.container}>
        <Text style={{
          fontFamily: 'SmileySans-Oblique',
          fontSize: fontSize,
          color: fontColor,
        }}>{children}</Text>
      </View>
    );
  }

export default HukidashiCustom;
