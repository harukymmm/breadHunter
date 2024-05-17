import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../route';
import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import ButtonCustom from "../../components/CustomButtonComponent";
import DistanceView from '../../components/DistanceViewComponent';
import MapView from 'react-native-maps';

//遷移の型指定　
type Navigation = NavigationProp<StackParamList>;

export default function MapScreen() {

  const navigation = useNavigation<Navigation>();
  const route = useRoute<RouteProp<StackParamList, 'MapDefault'>>();
  const { breadId } = route.params;
  const goal_latitude = 35.02526; 
  const goal_longitude = 135.78158;
  
  const [region, setRegion] = useState({
    latitude: 35.02886,
    longitude: 135.77929,
    latitudeDelta: 0.0024,
    longitudeDelta: 0.0024,//縮尺
  });

  useEffect(() => {
    console.log(region.latitude, region.longitude);
    const distance = getDistance(region.latitude, region.longitude, goal_latitude, goal_longitude);
    if (distance < 0.2) { // 目的地と現在地の距離が近くなると遷移
      navigation.navigate('NearBakery', {breadId: breadId}); 
    }
  ;
  }, [region]);

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }

  const updateRegion = () => {
    setRegion({
      latitude: 35.02638,
      longitude: 135.78082,
      latitudeDelta: 0.0024,
      longitudeDelta: 0.0024,
      //京大時計台、デモではここに遷移して試したい
    })
  }


  return (
    <View style={styles.container}>
       <View style = {styles.mapzoon}>
          <MapView
            style={styles.mapimage}
            initialRegion={region}
            zoomEnabled={false}
          />
          <Image
          style={styles.overlayImage}
          source={require('../../assets/arrow_N.png')}
          />
       </View>

       <View style={styles.reloadbutton}>
          <ButtonCustom
          onClick={() => updateRegion()}
          children="現在地更新"
          borderColor="#FBF7EF"
          borderWidth={3}
          color='#FF8628'
          height={50}
          width={300}
          radius={90}
          fontSize={25}
          fontColor="#FBF7EF"
          justifyContent='center'
          alignItems='center'
          />
        </View>
        <View style={styles.characterContainer}>
          <View style={ styles.buttonContainer }>
              <View style={ styles.distance }>
                <DistanceView 
                long={20}
                height={80} 
                width={150}
                radius={5}
                fontSize={20} 
                fontColor='#332E21'
                justifyContent='center'
                alignItems='center'
                />
              </View>
              <ButtonCustom
                onClick={() => navigation.navigate('QuizSelect')}
                children="パン選択に戻る"
                borderColor='#FF8628'
                borderWidth={5}
                color="#FBF7EF"
                height={45}
                radius={90}
                width={150}
                fontSize={18}
                fontColor='#FF8628'
                justifyContent='center'
                alignItems='center'
              />
              <View style={{flex: 0, height: 5,}} />{/* 空白 */} 
              <ButtonCustom
                onClick={() => navigation.navigate('ResultGiveUp', {breadId: breadId})}
                children="諦める"
                borderColor='#FF8628'
                borderWidth={5}
                color="#FBF7EF"
                height={45}
                radius={90}
                width={150}
                fontSize={18}
                fontColor='#FF8628'
                justifyContent='center'
                alignItems='center'
              />
          </View>
          <Image 
            source={require("../../assets/hunter_Longmap.png")} 
            style={styles.character} 
          /> 
        </View>
    </View>
  );
}

registerRootComponent(MapScreen);

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
  overlayImage: {
    position: 'absolute',
    width: '15%',
    height: '15%',
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  reloadbutton:{
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 10,
  },
  distance:{
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
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'flex-end', // 要素を右揃え
    marginBottom: 20,
  },
});