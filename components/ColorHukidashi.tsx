//背景色付きのふきだしを実装するコンポーネント
//フォント呼び出しあり

import React from "react";
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useFonts } from 'expo-font';

interface Props {
    children?: React.ReactNode;   //テキスト文字情報
    height: number;       //高さ
    width: number;         //幅
    radius: number;        //角の丸さ
    borderColor: string;
    borderWidth: number;
    color: string;
    fontSize: number;     //フォントサイズ
    fontColor: string;    //フォントの色
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

const Colorhukidashi = ({ 
   children, height, width, radius, borderColor, borderWidth, color, fontSize, fontColor, justifyContent, alignItems}: Props) => {
    
    const styles = StyleSheet.create({
      container: {
          borderColor: borderColor,
          borderWidth: borderWidth,
          backgroundColor: color,
          height: height,
          width: width,
          borderRadius: radius,
          justifyContent: justifyContent,
          alignItems: alignItems,
          flexDirection: 'column',
          padding: 10, // 必要に応じてパディング（内側の余白）を追加
        },
    });

    const [fontsLoaded, fontError] = useFonts({
      'SmileySans-Oblique': require('../assets/fonts/SmileySans-Oblique.otf'),
    });
    if (!fontsLoaded && !fontError) {
      return null;
    };
  
    return (
        <View style = {styles.container}>
            <Text style={{
              fontFamily: 'SmileySans-Oblique',
              fontSize: fontSize,
              color: fontColor,
              textAlign: "center"
            }}>
              {children}
            </Text>
        </View>
    );
  }

export default Colorhukidashi;
