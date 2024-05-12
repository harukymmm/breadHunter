//クイズの答えセットを示すコンポーネント

import React from "react";
import { Text, StyleSheet, View, Image, Animated } from 'react-native';

interface Props { 
    imageSource: any; //画像ソース
    breadPlace?: React.ReactNode; //店名
    breadName?: React.ReactNode;   //パンの名前
    judgeImage: any; //判定画像ソース
}

const QuizAnswer = ({ 
    imageSource, breadPlace, breadName, judgeImage}: Props) => {
    
        const animatedValue = React.useRef(new Animated.Value(0)).current;

        React.useEffect(() => {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, [animatedValue]);
    
        const scale = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 1],
        });
    

        return (
            <View style={styles.container}>
                <Image 
            source={imageSource}  //画像のソースをpropsから受け取る
            style={{ width: 200, height: 200}}
            />
            <View style={{flex: 0, width: 10,}} />{/* 空白 */} 
            <View style={styles.resultTextContainer}>
            <Text style= {styles.resultText}>{breadPlace}の{breadName}</Text>
            </View>
            <Animated.View
                style={[
                    styles.symbolContainer,
                    { transform: [{ scale }] }
                ]}
            >
            <Image
                    source={judgeImage}
                    style={styles.symbol}
                />
            </Animated.View>
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
        resultTextContainer: {
            position: 'relative',
            flexDirection: 'row',
            width: '50%', // テキストのコンテナーの幅を調整
        },
        symbolContainer: {
            position: 'absolute', // 画像をテキストに重ね合わせるため
            bottom: 0, // テキストの下に配置
            right: 0, // テキストの右端に配置
        },
        symbol: {
            opacity: 0.3,
            flex: 1,
            width: 300,
            height: 200,
        },
        container: {
            flex: 0,
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#FBF7EF', //背景色
            borderColor: '#FBF7EF', // 白色の背景枠
            paddingHorizontal: 10, // 左右の余白を追加
        },
            });

    export default QuizAnswer;