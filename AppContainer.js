import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

function AppContainer() {

  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home' 
        screenOptions={
          { 
            title: 'ListMaker 2000',
          }}>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Details' component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;