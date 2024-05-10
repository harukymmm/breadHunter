//クイズの答えセットを示すコンポーネント

import React from "react";
import { Text, StyleSheet, View, Image } from 'react-native';

interface Props { 
    imageSource: any; //画像ソース
    breadPlace?: React.ReactNode; //店名
    breadName?: React.ReactNode;   //パンの名前
}

const QuizAnswer = ({ 
    imageSource, breadPlace, breadName}: Props) => {
    
        return (
            <View style={styles.container}>
                <Image 
            source={imageSource}  //画像のソースをpropsから受け取る
            style={{ width: 200, height: 200}}
            />
            <View style={{flex: 0, width: 10,}} />{/* 空白 */} 
            <Text style= {styles.resultText}>お題パンは{'\n'}{breadPlace}の{'\n'}{breadName}でした</Text>
            </View>
        );
    }

    const styles = StyleSheet.create({
        resultText: {
            fontFamily: 'SmileySans-Oblique',
            fontSize: 20,
            color: '#332E21',
            textAlign: 'left',
        },
        container: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#FBF7EF', //背景色
            borderColor: '#FBF7EF', // 白色の背景枠
            borderWidth: 5, // 枠の太さ
        },
            });

    export default QuizAnswer;