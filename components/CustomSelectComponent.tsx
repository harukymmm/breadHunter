//パン選択画面で使用するパン画像、ランク、ボタンのセット

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ChangeColorButton from './ChangeColorButtonComp';

interface Props {
    onPress: () => void;
    rank?: React.ReactNode;
    source: any;
}

const SelectFigComp = ({onPress, rank, source}: Props) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false); // ボタンが押されたかどうかの状態
  const handleButtonPress = () => {
    // ボタンが押されたときの処理
    setIsButtonPressed(true); // ボタンが押された状態をセット
  };

    return (
      <View style={styles.container}>
      <Text style= {styles.rankText}>ランク{rank}</Text>
        <TouchableOpacity onPress={onPress}>
            <Image 
            source={source}  //画像のソースをpropsから受け取る
            style={{ width: 150, height: 150}}
            />
        </TouchableOpacity>
        <View style={styles.space} />{/* 空白 */}
      <ChangeColorButton
      borderWidth={5}
      onClick={handleButtonPress} // ボタンが押されたときの処理を渡す
      isPressed={isButtonPressed} // ボタンの押された状態を渡す
      height={35}
      width={35}
      />
      </View>
    );
  }

  const styles = StyleSheet.create({
    rankText: {
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

  
  export default SelectFigComp;
