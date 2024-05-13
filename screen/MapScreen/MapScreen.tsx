import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../route';
import { MapParamList } from './routeMap';
import { NavigationProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import ButtonCustom from "../../components/CustomButtonComponent";
import DistanceView from '../../components/DistanceViewComponent';

//遷移の型指定　P：フォルダ間の遷移　K：フォルダ内の遷移
type NavigationP = NavigationProp<StackParamList>;
type NavigationK = NavigationProp<MapParamList>;

export default function MapScreen() {
  //Pはフォルダ間の遷移、Kはフォルダ内の遷移
  const navigationP = useNavigation<NavigationP>();
  const navigationK = useNavigation<NavigationK>();

  //QuizSelectScreenから渡された変数breadId
  const route = useRoute();
  const { breadId } = route.params;

  return (
    <View style={styles.container}>

       <View style = {styles.mapzoon}>
          <Image 
            source={require("../../assets/breadicon.png")}  
            style={styles.mapimage}
          /> 
       </View>

       <View style={styles.reloadbutton}>
          <ButtonCustom
              onClick={() => console.log("Push 現在地更新ボタン")}
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
                      long={breadId}
                      height={80} 
                      width={150}
                      radius={5}
                      fontSize={20} 
                      fontColor='#332E21'
                      justifyContent='center'
                      alignItems='center'
                />
                </View>{/* breadIdを距離表示のところに表示（応急処置）*/}

                <ButtonCustom
                    onClick={() => navigationP.navigate('QuizSelect')}
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
                    onClick={() => navigationP.navigate('ResultGiveUp')}
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
      
      {/* 絵を押すとマップ2へ遷移（応急処置） */} 
      <TouchableOpacity onPress={() => navigationK.navigate('Map2')}> 
       <Image 
        source={require("../../assets/hunter_Longmap.png")} 
        style={styles.character} 
       /> 
       </TouchableOpacity>
       
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