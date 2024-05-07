//押すと色の変わるボタンを実装するコンポーネント
//ボタンの状態は isPressed という状態変数によって管理される

import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useFonts } from 'expo-font';

interface Props {
    children?: React.ReactNode;   //ボタン内のテキスト文字情報
    onClick: () => void;  //ボタンクリック時の反応
    borderColor: string;  //ボタン外周線の色
    borderWidth: number;  //ボタン外周線の太さ
    color: string;        //ボタンの色
    changeColor: string,  //押された後の色
    height: number;       //ボタン高さ
    width: number;         //ボタン幅
    radius: number;        //ボタンの角の丸さ
    fontSize: number;     //フォントサイズ
    fontColor: string;    //フォントの色
}

//justifyContentは、要素の**主軸（flex directionがrowの場合は水平方向、columnの場合は垂直方向）**に沿って、子要素（flexアイテム）の配置方法を指定します。

//center: 子要素を主軸の中央に配置します。
//flex-start: 子要素を主軸の開始位置に配置します。主軸が水平の場合は左端、垂直の場合は上端になります。
//flex-end: 子要素を主軸の終了位置に配置します。主軸が水平の場合は右端、垂直の場合は下端になります。
//space-between: 子要素を等間隔に配置します。最初の要素は主軸の開始位置に、最後の要素は主軸の終了位置に、残りの要素は等間隔で配置されます。
//space-around: 子要素を等間隔に配置しますが、最初の要素と最後の要素の両端には余分なスペースが追加されます。
//space-evenly: 子要素を等間隔に配置し、最初の要素と最後の要素の両端にも同じ量のスペースが追加されます。



const ChangeColorButton = ({ 
  onClick, children, borderColor, borderWidth, color, changeColor, height, width, radius, fontSize, fontColor}: Props) => {
    
    const [fontsLoaded, fontError] = useFonts({
        'SmileySans-Oblique': require('../assets/fonts/SmileySans-Oblique.otf'),
      });
      if (!fontsLoaded && !fontError) {
        return null;
      }

      const [isPressed, setIsPressed] = useState(false); // ボタンが押されたかどうかの状態
      
      const handlePress = () => {
        onClick(); // onClickプロップを呼び出します
        setIsPressed(!isPressed); // ボタンの状態を切り替えます
    }
    
      const styles = StyleSheet.create({
    button: {
        borderColor: borderColor,
        borderWidth: borderWidth,
        backgroundColor: isPressed ? changeColor : color, // ボタンが押された場合は異なる色を使用します
        height: height,
        width: width,
        borderRadius: radius,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
      },
    });
  
    return (
      <TouchableOpacity 
        style={styles.button}
        onPress={handlePress} // カスタムのhandlePress関数を使用します
      >
        <Text style={{
          fontFamily: 'SmileySans-Oblique',
          fontSize: fontSize,
          color: fontColor,
        }}>{children}</Text>
      </TouchableOpacity>
    );
  }

export default ChangeColorButton;
