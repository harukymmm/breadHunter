import { StyleSheet, Text, View, Image, Button } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import ButtonCustom from "../../components/CustomButtonComponent";
import HukidashiCustom from '../../components/HukidashiComponent';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../route';
import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

//遷移の型指定　
type Navigation = NavigationProp<StackParamList>;

export default function TakePhotoScreen() {

  const navigation = useNavigation<Navigation>();
  const route = useRoute<RouteProp<StackParamList, 'TakePhoto'>>();
  const { breadId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.fukidashi}>
        <HukidashiCustom
          height={90}
          width={250}
          radius={15}
          fontSize={20}
          justifyContent='center'
          alignItems='center'
          >
          パンを見つけたら{'\n'}写真を撮ってくれ
        </HukidashiCustom>
      </View>
      <Image 
        source={require("../../assets/hunter_TakePhoto.png")} 
        style={styles.character} 
      />
      <View style={styles.buttoncontainer}>
        
  {/* 押すとPhotoLへ遷移（応急処置） */} 
        <ButtonCustom
          borderColor="#FF8628"
          borderWidth={5}
          color="#FF8628"
          height={230}
          onClick={() => 
            navigation.navigate('PhotoCheck', {breadId: breadId})
          }
          radius={0}
          width={200}
          fontSize={25}
          fontColor='#FBF7EF'
          justifyContent='center'
          alignItems='center'
        >カメラを{'\n'}起動する
          </ButtonCustom>

          <ButtonCustom
            borderColor="#FBF7EF"
            borderWidth={5}
            color="#FBF7EF"
            height={230}
            onClick={() => navigation.navigate('NearBakery',{breadId: breadId})}
            radius={0}
            width={200}
            fontSize={25}
            fontColor='#FF8628'
            justifyContent='center'
            alignItems='center'
          >前の画面に{'\n'}戻る
          </ButtonCustom>
      </View>
      
      <View style={styles.checkButton}>
        <ButtonCustom
          borderColor="#FF8628"
          borderWidth={5}
          color="#FF8628"
          height={50}
          onClick={() => navigation.navigate('BreadDetail',{breadId: breadId})}
          radius={90}
          width={300}
          children="お題パンの確認" 
          fontSize={25}
          fontColor="#FBF7EF"
          justifyContent='center'
          alignItems='center'
        />
        <View style={{flex: 0, height: 5}} />{/* 空白 */} 
         <ButtonCustom
          borderColor="#FF8628"
          borderWidth={5}
          color="#FBF7EF"
          height={50}
          onClick={() => navigation.navigate('ResultGiveUp',{breadId: breadId})}
          radius={90}
          width={300}
          children="買えなかった..." 
          fontSize={25}
          fontColor='#FF8628'
          justifyContent='center'
          alignItems='center'
        />
      </View>
      
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F3E2CF',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  fukidashi:{
    flex: 0,
    marginTop: 40,
    marginBottom: 10,
  },
  character:{
    flex: 0,
    width: 350,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain', 
    marginBottom: 10,
  },
  buttoncontainer:{
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 水平方向の中央に配置する
    marginBottom: 15,
  },
  checkButton:{
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // 水平方向の中央に配置する
    marginBottom: 10,
  }
});



registerRootComponent(TakePhotoScreen)