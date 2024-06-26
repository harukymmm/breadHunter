//パン詳細の画面を作るコンポーネント
//フォント呼び出しあり

import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { useFonts } from 'expo-font';

interface Props { 
    source: any; //画像ソース
    rank?: React.ReactNode; //ランク
    detail?: React.ReactNode;   //パン説明
    onPress: () => void;    //ボタン反応
}

const ChooseBread = ({ onPress, source, rank, detail}: Props) => {

    const [fontsLoaded, fontError] = useFonts({
        'SmileySans-Oblique': require('../assets/fonts/SmileySans-Oblique.otf'),
      });
      if (!fontsLoaded && !fontError) {
        return null;
      };

    return (
        <View style={styles.container}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onPress}>
                        <Image
                        source={require('../assets/icon_Close.png')}
                        style={{width: 30, height: 30}}
                        />
                    </TouchableOpacity>
                </View> 
                    <Image 
                        source={source}  //画像のソースをpropsから受け取る
                        style={{ width: 300, height: 300}}
                    />
                    <Text style= {styles.rankText}>ランク{rank}</Text>
                    <Text style = {styles.detailText}>{detail}</Text>
                <View style={styles.spaceW} />{/* 空白 */}
        </View>
    );
    }

    const styles = StyleSheet.create({
        rankText: {
            fontFamily: 'SmileySans-Oblique',
            fontSize: 40,
            color: '#332E21',
            textAlign: 'left',
        },
        detailText: {
            fontFamily: 'SmileySans-Oblique',
            fontSize: 18,
            color: '#332E21',
            textAlign: 'center',
        },
        container: {
            flex: 0,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor:'#FBF7EF', //背景色
            borderColor: '#FBF7EF', // 白色の背景枠
            borderWidth: 5, // 枠の太さ
        },
        button: {
            flex: 0,
            flexDirection: 'row', // 水平方向の配置を指定
            justifyContent: 'flex-start', // 主軸（水平方向）の開始位置に配置
        },
        spaceW: {
            flex: 1,
            width: 70,
          }
    });

    export default ChooseBread;
