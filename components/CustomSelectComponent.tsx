import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import ButtonCustom from './CustomButtonComponent';

interface Props {
    onPress: () => void;
    rank?: React.ReactNode;
    source: any;
}

const SelectFigComp = ({onPress, rank, source}: Props) => {
    
    return (
      <View style={styles.container}>
        <Text style= {styles.rankText}>{rank}</Text>
        <TouchableOpacity onPress={onPress}>
            <Image 
            source={source}  //画像のソースをpropsから受け取る
            style={{ width: 150, height: 150}}
            />
        </TouchableOpacity>
        <View style={styles.space} />{/* 空白 */}
        <ButtonCustom
          borderColor="#FF8628"
          borderWidth={5}
          color="#FBF7EF"
          height={35}
          onClick={() => console.log("You clicked on the miniButton!")}
          radius={90}
          width={35}
          children="" 
          fontColor="#FBF7EF"
          fontSize={1}
          justifyContent='center'
          alignItems='center'
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
