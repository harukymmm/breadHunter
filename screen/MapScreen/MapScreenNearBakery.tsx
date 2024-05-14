import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { useNavigation } from '@react-navigation/native';
import ButtonCustom from "../../components/CustomButtonComponent";
import HukidashiCustom from '../../components/HukidashiComponent';
import Colorhukidashi from '../../components/ColorHukidashi';
import MapView from 'react-native-maps';
import { StackParamList } from '../../route';
import { NavigationProp } from '@react-navigation/native';

type Navigation = NavigationProp<StackParamList>;

export default function MapScreenNearBakery() {
  
  const navigation = useNavigation<Navigation>();

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
        <MapView
            style={styles.mapimage}
            initialRegion={{
              latitude: 35.0252986,
              longitude: 135.781654,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            zoomEnabled={false}
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
                  children='この中のどこかにパンが...'
                  height={50} 
                  width={220}
                  radius={5}
                  fontSize={20} 
                  fontColor='#332E21'
                  justifyContent='center'
                  alignItems='center'
                />
              </View>
              <ButtonCustom
                onClick={() => navigation.navigate('TakePhotoF')}
                children="パン発見！"
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
                onClick={() => navigation.navigate('ResultGiveUp')}
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

registerRootComponent(MapScreenNearBakery);

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
    width: 375,
    height: 375,
    backgroundColor: "#FBF7EF", 
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 10,
  },
  mapimage: {
    flex: 0,
    width: 350,
    height: 350,
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