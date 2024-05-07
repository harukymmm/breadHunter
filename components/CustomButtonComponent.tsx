//ボタンを実装するコンポーネント

import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
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

//justifyContentは、要素の**主軸（flex directionがrowの場合は水平方向、columnの場合は垂直方向）**に沿って、子要素（flexアイテム）の配置方法を指定します。

//center: 子要素を主軸の中央に配置します。
//flex-start: 子要素を主軸の開始位置に配置します。主軸が水平の場合は左端、垂直の場合は上端になります。
//flex-end: 子要素を主軸の終了位置に配置します。主軸が水平の場合は右端、垂直の場合は下端になります。
//space-between: 子要素を等間隔に配置します。最初の要素は主軸の開始位置に、最後の要素は主軸の終了位置に、残りの要素は等間隔で配置されます。
//space-around: 子要素を等間隔に配置しますが、最初の要素と最後の要素の両端には余分なスペースが追加されます。
//space-evenly: 子要素を等間隔に配置し、最初の要素と最後の要素の両端にも同じ量のスペースが追加されます。



const ButtonCustom = ({ 
  onClick, children, borderColor, borderWidth, color, height, width, radius, fontSize, fontColor, justifyContent, alignItems}: Props) => {
    
    const [fontsLoaded, fontError] = useFonts({
        'SmileySans-Oblique': require('../assets/fonts/SmileySans-Oblique.otf'),
      });
      if (!fontsLoaded && !fontError) {
        return null;
      }
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
  
    return (
      <TouchableOpacity 
        style={styles.button}
        onPress={onClick}
      >
        <Text style={{
          fontFamily: 'SmileySans-Oblique',
          fontSize: fontSize,
          color: fontColor,
        }}>{children}</Text>
      </TouchableOpacity>
    );
  }

export default ButtonCustom;
