import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import StartScreen  from './screen/StartScreen/StartScreen';
import QuizSelectScreen from './screen/QuizSelectScreen/QuizSelectScreen';
import MapScreen from './screen/MapScreen/MapScreen';
import TakePhotoScreen from './screen/TakePhotoScreen/TakePhotoScreen';
import ResultScreen from './screen/ResultScreen/ResultScreen';

const Stack = createStackNavigator();


export default function App() {
  const [fontsLoaded] = useFonts({
    'SmileySans-Oblique':
    require('./assets/fonts/SmileySans-Oblique.otf')
  });
  return (
    
  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QuizSelect" component={QuizSelectScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TakePhoto" component={TakePhotoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

