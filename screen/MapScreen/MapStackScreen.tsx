import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './MapScreen';
import MapScreenNearBakery from './MapScreenNearBakery';

const Stack = createStackNavigator();

function MapStackScreen() {
  return (
    <Stack.Navigator initialRouteName="MapScreen">
      <Stack.Screen name="MapDefault" component={MapScreen} />
      <Stack.Screen name="NearBakery" component={MapScreenNearBakery} />
    </Stack.Navigator>
  );
}

export default MapStackScreen;