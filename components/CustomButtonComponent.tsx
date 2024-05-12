//ボタンを実装するコンポーネント
//フォント呼び出しあり

import React from "react";
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import { useFonts } from 'expo-font';

interface Props {
    children?: React.ReactNode;   //ボタン内のテキスト文字情報
    onClick: () => void;  //ボタンクリック時の反応
    borderColor: string;  //ボタン外周線の色
    borderWidth: number;  //ボタン外周線の太さ
    color: string;        //ボタンの色
    height: number;       //ボタン高さ
    width: number;         //ボタン幅
    radius: number;        //ボタンの角の丸さ
    fontSize: number;     //フォントサイズ
    fontColor: string;    //フォントの色
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

const ButtonCustom = ({ 
  onClick, children, borderColor, borderWidth, color, height, width, radius, fontSize, fontColor, justifyContent, alignItems}: Props) => {
    
    const styles = StyleSheet.create({
    button: {
        borderColor: borderColor,
        borderWidth: borderWidth,
        backgroundColor: color,
        height: height,
        width: width,
        borderRadius: radius,
        justifyContent: justifyContent,
        alignItems: alignItems,
        flexDirection: 'row',
      },
    });
    const [fontsLoaded, fontError] = useFonts({
      'SmileySans-Oblique': require('../assets/fonts/SmileySans-Oblique.otf'),
    });
    if (!fontsLoaded && !fontError) {
      return null;
    };
  
    return (
      <TouchableOpacity 
        style={styles.button}
        onPress={onClick}
      >
        <Text style={{
          fontFamily: 'SmileySans-Oblique',
          fontSize: fontSize,
          color: fontColor,
          textAlign: "center"
        }}>{children}</Text>
      </TouchableOpacity>
    );
  }

export default ButtonCustom;
