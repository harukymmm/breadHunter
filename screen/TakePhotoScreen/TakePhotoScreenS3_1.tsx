import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import ButtonCustom from "../../components/CustomButtonComponent";
import HukidashiCustom from '../../components/HukidashiComponent';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../route';
import { NavigationProp } from '@react-navigation/native';

//遷移の型指定　P：フォルダ間の遷移　K：フォルダ内の遷移
type Navigation = NavigationProp<StackParamList, 'TakePhotoF'>;


export default function TakePhotoScreenF() {
    //Pはフォルダ間の遷移、Kはフォルダ内の遷移
    const navigation = useNavigation<Navigation>();
    

    //カメラ機能
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);

    useEffect(() => {
      const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus === 'granted') {
          setHasCameraPermission(true);
        } else {
          Alert.alert(
            'Permission Denied',
            'You need to grant camera permission to use this feature.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        }
      
        const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
        if (mediaLibraryStatus === 'granted') {
          setHasMediaLibraryPermission(true);
        } else {
          Alert.alert(
            'Media Library Permission Denied',
            'You need to grant media library permission to use this feature.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        }
      };

      requestPermissions();
  }, []);

  
  const takePictureAndSave = async () => {
    if (!hasCameraPermission || !hasMediaLibraryPermission) {
      Alert.alert(
        'Permission Required',
        'You need to grant camera and media library permissions to take pictures.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      return;
    }
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3] as [number, number],
      quality: 1,
    };

    const response = await ImagePicker.launchCameraAsync(options);
    if (!response.canceled) {
      try {
        const assets = response.assets;
        if (assets && assets.length > 0) {
          const localUri = assets[0].uri;
          await MediaLibrary.saveToLibraryAsync(localUri);
          console.log('Photo saved to camera roll');
          // 撮った画像を次の画面に渡して遷移
          navigation.navigate('PhotoCheck', { breadId: 3 ,photoUri: localUri }); //BreadId変更すること
        }
      } catch (error) {
        console.error('Error saving photo to camera roll:', error);
      }
    }
  };

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
          onClick={takePictureAndSave}
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
            onClick={() => navigation.navigate('Map2')}
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
          onClick={() => navigation.navigate('BreadDetail',{breadId: 1})}
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
          onClick={() => navigation.navigate('ResultGiveUp')}
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



registerRootComponent(TakePhotoScreenF)