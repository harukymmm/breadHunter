import React, { useState, useEffect }from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import StartScreen  from './screen/StartScreen/StartScreen';
import QuizSelectScreen from './screen/QuizSelectScreen/QuizSelectScreen';
import QuizDetailScreen from './screen/QuizSelectScreen/QuizDetailScreen';
import MapScreen from './screen/MapScreen/MapScreen';
import MapScreen2 from './screen/MapScreen/MapScreen2';
import CameraScreen from './screen/TakePhotoScreen/CameraScreen';
import TakePhotoScreenF from './screen/TakePhotoScreen/TakePhotoScreenS3_1';
import BreadDetailScreen from './screen/TakePhotoScreen/BreadDetailScreen';
import PhotoCheckScreen from './screen/TakePhotoScreen/TakePhotoScreenS3_3';
import ResultCorrectScreen from './screen/ResultScreen/ResultCorrectScreen';
import ResultFalseScreen from './screen/ResultScreen/ResultFalseScreen';
import ResultGiveUpScreen from './screen/ResultScreen/ResultGiveUpScreen';


const Stack = createStackNavigator();

async function loadFonts() {
  await Font.loadAsync({
    'SmileySans-Oblique': require('./assets/fonts/SmileySans-Oblique.ttf'),
  });
}

LogBox.ignoreAllLogs()

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    
  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QuizSelect" component={QuizSelectScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="QuizDetail" component={QuizDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Map2" component={MapScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TakePhotoF" component={TakePhotoScreenF} options={{ headerShown: false }} />
        <Stack.Screen name="BreadDetail" component={BreadDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PhotoCheck" component={PhotoCheckScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResultCorrect" component={ResultCorrectScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResultFalse" component={ResultFalseScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResultGiveUp" component={ResultGiveUpScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}