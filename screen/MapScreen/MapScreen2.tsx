import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import ButtonCustom from "../../components/CustomButtonComponent";
import HukidashiCustom from '../../components/HukidashiComponent';
import Colorhukidashi from '../../components/ColorHukidashi';

export default function MapScreen2() {
  return (
    <View style={styles.container}>
      <Colorhukidashi
              children='パン付近に到着！'
              height={50} 
              width={500}
              radius={0}
              borderColor=''
              borderWidth={0}
              color='#FF8628'
              fontSize={25} 
              fontColor='#FBF7EF'
              justifyContent='center'
              alignItems='center'
            />

       <View style = {styles.mapzoon}>
          <Image 
            source={require("../../assets/breadicon.png")}  
            style={styles.mapimage}
          /> 
       </View>

       <View style={styles.characterContainer}>
          <Image 
            source={require("../../assets/hunter_Near.png")} 
            style={styles.character} 
          /> 

            <View style={ styles.buttonContainer }>

                    <View style={ styles.hukidasi }>
                        <HukidashiCustom
                            children='どの店に入るか決めたか？'
                            height={50} 
                            width={220}
                            radius={5}
                            fontSize={18} 
                            justifyContent='center'
                            alignItems='center'
                          />
                      </View>

                <ButtonCustom
                    onClick={() => console.log("Push 店に入るボタン")}
                    children="店に入る"
                    borderColor='#FF8628'
                    borderWidth={5}
                    color='#FF8628'
                    height={45}
                    radius={90}
                    width={180}
                    fontSize={18}
                    fontColor="#FBF7EF"
                    justifyContent='center'
                    alignItems='center'
                  />
                
                <View style={{flex: 0, height: 10,}} />{/* 空白 */} 

                <ButtonCustom
                    onClick={() => console.log("Push 諦めるボタン")}
                    children="諦める"
                    borderColor='#FF8628'
                    borderWidth={5}
                    color="#FBF7EF"
                    height={45}
                    radius={90}
                    width={180}
                    fontSize={18}
                    fontColor='#FF8628'
                    justifyContent='center'
                    alignItems='center'
                  />
                
             </View>
       
        </View>
      </View>
  );
}

registerRootComponent(MapScreen2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e2cf',
    alignItems: 'center',
    justifyContent: 'flex-end', 
    paddingHorizontal: 10, // 左右の余白を追加
  },
  mapzoon: {
    flex: 0,
    width: 350,
    height: 350,
    backgroundColor: "#FBF7EF", 
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 10,
  },
  mapimage: {
    flex: 0,
    width: 300,
    height: 300,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center', 
  },
  hukidasi:{
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 30,
  },
  characterContainer:{
    flex: 0,
    flexDirection: 'row',
    alignItems:'flex-end',
    justifyContent: 'flex-end', 
    marginBottom: 0,
  },
  character: {
    flex: 1,
    width: 200,
    height: 200,
    alignSelf: 'center',
    alignItems: 'flex-end', // 要素を右揃え
    resizeMode: 'contain', 
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    zIndex: 999,
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'flex-end', // 要素を右揃え
    marginBottom: 35,
  },
});