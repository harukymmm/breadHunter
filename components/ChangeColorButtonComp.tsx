//押すと色の変わるボタンを実装するコンポーネント、コンソールログに押されたかどうかの表示が出る
//CustomSelectComponent専用にしても良い
//ボタンの状態は isPressed という状態変数によって管理される

import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import { useFonts } from 'expo-font';

interface Props {
    onClick: () => void;  //ボタンクリック時の反応
    isPressed: boolean; // isPressed プロパティを追加
    borderWidth: number;  //ボタン外周線の太さ
    height: number;       //ボタン高さ
    width: number;         //ボタン幅
}


const ChangeColorButton = ({ 
  onClick, borderWidth, height, width}: Props) => {
    
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
        console.log(!isPressed ? 'ボタンが押されました' : 'ボタンはまだ押されていません');
        
    };
    
    const styles = StyleSheet.create({
    button: {
        borderColor: "#FF8628",
        borderWidth: borderWidth,
        backgroundColor: isPressed ? "#FF8628" : "#FBF7EF", // ボタンが押された場合は異なる色を使用します
        height: height,
        width: width,
        borderRadius: 90,
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
      </TouchableOpacity>
    );
  }

export default ChangeColorButton;
