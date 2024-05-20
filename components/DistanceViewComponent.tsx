//Mapscreen用、距離を外部から渡すふきだし
//フォント読み込みあり
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

interface Props {
    long: number;    //距離
    height: number;       //高さ
    width: number;         //幅
    radius: number;        //角の丸さ
    fontSize: number;     //フォントサイズ
    fontColor: string;    //フォントの色
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

const DistanceView = ({long, height, width, radius, fontSize, fontColor, justifyContent, alignItems}: Props) => {
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#FBF7EF",
            height: height,
            width: width,
            borderRadius: radius,
            justifyContent: justifyContent,
            alignItems: alignItems,
            flexDirection: 'column',
            padding: 10, // 必要に応じてパディング（内側の余白）を追加
          },
        text: {
            fontFamily: 'SmileySans-Oblique',
            fontSize: fontSize,
            color: fontColor,
            textAlign: "center"
        }
        });
    
    const [fontsLoaded, fontError] = useFonts({
          'SmileySans-Oblique': require('../assets/fonts/SmileySans-Oblique.otf'),
        });
        if (!fontsLoaded && !fontError) {
          return null;
        };
    
    return (
        <View style = {styles.container}>
          <Text style={styles.text}>パンまであと{'\n'}{long}kmだ</Text>
        </View>
      );

    
};

export default DistanceView;