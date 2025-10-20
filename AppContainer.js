import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

function AppContainer() {

  const initListItems = [
    { text: 'Get costume', key: Date.now() },
    { text: 'Get candy', key: Date.now() + 1}
  ];

  const [listItems, setListItems] = useState(initListItems);

  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home' 
        screenOptions={
          { 
            title: 'ListMaker 2000',
          }}>
        <Stack.Screen name='Home'>
          {(props) => <HomeScreen {...props} appState={[listItems, setListItems]}/> }
        </Stack.Screen>
        <Stack.Screen name='Details'>
          {(props) => <DetailsScreen {...props} appState={[listItems, setListItems]}/> }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;