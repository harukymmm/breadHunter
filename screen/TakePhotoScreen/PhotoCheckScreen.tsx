import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import HukidashiCustom from '../../components/HukidashiComponent';
import ButtonCustom from "../../components/CustomButtonComponent";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackParamList } from '../../route';
import { NavigationProp } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

//遷移の型指定
type Navigation = NavigationProp<StackParamList, 'PhotoCheck'>;


export default function PhotoCheckScreen() {

  const navigation = useNavigation<Navigation>();
  const route = useRoute<RouteProp<StackParamList, 'PhotoCheck'>>();
  const { breadId } = route.params;
  const { photoUri: initialPhotoUri } = route.params as { photoUri: string }; // 撮影した写真のURIを受け取る

  const [photoUri, setPhotoUri] = useState(initialPhotoUri);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);

  //ライブラリから画像選択
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

  const selectPictureAndSave = async () => {
    if (!hasCameraPermission || !hasMediaLibraryPermission) {
      Alert.alert(
        'Permission Required',
        'You need to grant camera and media library permissions to select pictures.',
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

    const response = await ImagePicker.launchImageLibraryAsync(options);
    if (!response.canceled) {
      try {
        const assets = response.assets;
        if (assets && assets.length > 0) {
          const localUri = assets[0].uri;
          setPhotoUri(localUri); // 選択された写真のURIを状態変数に保存
          await MediaLibrary.saveToLibraryAsync(localUri);
          console.log('Photo saved to camera roll');
        }
      } catch (error) {
        console.error('Error saving photo to camera roll:', error);
      }
    }
  };

  //フォルダに画像を格納する関数
  const savePhotoToFolder = async (uri: string) => {
    const folderUri = `${FileSystem.documentDirectory}python/ForwardImg/`;
    try {
      // Create directory if it doesn't exist
      const dirInfo = await FileSystem.getInfoAsync(folderUri);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
      }

      // Get filename from uri
      const filename = uri.split('/').pop();
      const newPath = `${folderUri}${filename}`;

      // Copy file to the new directory
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      console.log(`Photo saved to ${newPath}`);
    } catch (error) {
      console.error('Error saving photo to folder:', error);
    }
  };


  const GetClassifyResult = async () => {
    try {
      const response = await fetch('http://localhost:5001/classify');
      if (!response.ok) {
        console.error('Network response was not ok');
      }
      const ClassifyResult = await response.json();
      console.log(ClassifyResult)
    }
    catch(e){
      console.error('Getting Classification Result not OK');
    }
  }
  
  GetClassifyResult();

  //OKボタンが押されたとき動作する関数
  const handleOkButtonPress = async () => {
    await savePhotoToFolder(photoUri);

    navigation.navigate('ResultCorrect', { breadId: breadId });
  };


  return (
    <View style={styles.container}>
      <View style={styles.fukidashi}>
          <HukidashiCustom
            height={90}
            width={250}
            radius={15}
            fontSize={25}
            justifyContent='center'
            alignItems='center'
            >
            この写真を使うか?
          </HukidashiCustom>
      </View>
      <View style={styles.images}>
        <Image
          source={{ uri: photoUri }} // 撮影した写真を表示
          style={styles.bread}
          />
        <Image
          source={require("../../assets/hunter_Check.png")} 
          style={styles.character}
          />
      </View> 
      <View style={styles.okbutton}>
          <ButtonCustom
            borderColor="#FF8628"
            borderWidth={5}
            color="#FF8628"
            height={80}
            onClick={handleOkButtonPress}
            radius={45}
            width={300}
            children="OK!" 
            fontSize={25}
            fontColor="#FBF7EF"
            justifyContent='center'
            alignItems='center'
          />
      </View>
      <View style={styles.buttoncontainer}>
        <ButtonCustom
          borderColor="#FF8628"
          borderWidth={5}
          color="#FBF7EF"
          height={120}
          onClick={() => navigation.navigate('TakePhoto', { breadId: breadId})} 
          radius={45}
          width={120}
          children="戻る" 
          fontSize={25}
          fontColor='#FF8628'
          justifyContent='center'
          alignItems='center'
        />
      <View style={{flex: 0, width: 10}} />{/* 空白 */} 
        <ButtonCustom
          borderColor="#FF8628"
          borderWidth={5}
          color="#FBF7EF"
          height={120}
          onClick={selectPictureAndSave}
          radius={45}
          width={120}
          children="ライブラリから選択" 
          fontSize={25}
          fontColor='#FF8628'
          justifyContent='center'
          alignItems='center'
        />
      
      </View>
    </View>
  );
}

registerRootComponent(PhotoCheckScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e2cf',
  },
  fukidashi:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: 50,
    marginBottom: 5,
  },
  images:{
    flex: 0,
    width: 350,
    height: 300,
    alignSelf: 'center',
    resizeMode: 'contain', 
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginBottom: 15,
  },
  bread:{
    flex: 0,
    width: 250,
    height: 250,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginBottom: 0,
  },
  character:{
    flex: 0,
    width: 100,
    height: 200,
    alignSelf: 'flex-end',
    resizeMode: 'contain', 
    flexDirection: 'column',
    justifyContent: 'flex-end', 
    marginBottom: 0,
  },
  headingtext:{
    color: '#fbf7ef',
    alignSelf: 'center',
    marginLeft: '15%',
    fontSize: 20
  },
  okbutton:{
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 15,
  },
  buttoncontainer:{
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
});