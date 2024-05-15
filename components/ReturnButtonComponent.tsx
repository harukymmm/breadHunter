//リターンボタンを実装するコンポーネント

import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet} from 'react-native';


interface Props {
    onClick: () => void;  //ボタンクリック時の反応
}

    
    const styles = StyleSheet.create({
    button: {
        borderColor: "#FF8628",
        borderWidth: 5,
        backgroundColor: '#FBF7EF',
        height: 50,
        width: 50,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
    
    image: {
        width: 30,  // 適切なサイズに変更してください
        height: 30, // 適切なサイズに変更してください
        resizeMode: 'contain',
        },
    });

    const ReturnButtonCustom = ({ onClick }: Props) => {
    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={onClick}
        >
            <Image 
                source={require("../assets/icon_Return.png")}  
                style={styles.image}
            />
        </TouchableOpacity>
    );
}

export default ReturnButtonCustom;
