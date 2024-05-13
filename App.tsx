import React, { useState, useEffect }from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import StartScreen  from './screen/StartScreen/StartScreen';
import QuizSelectScreen from './screen/QuizSelectScreen/QuizSelectScreen';
import QuizDetailScreen from './screen/QuizSelectScreen/QuizDetailScreen';
import MapScreen from './screen/MapScreen/MapScreen';
import TakePhotoScreen from './screen/TakePhotoScreen/TakePhotoScreen';
import ResultScreen from './screen/ResultScreen/ResultScreen';

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
        <Stack.Screen name="TakePhoto" component={TakePhotoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}