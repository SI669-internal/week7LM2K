import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { ListContext } from './context/ListContext';


const Stack = createNativeStackNavigator();

function AppContainer() {

  const initListItems = [
    { text: 'Get costume', key: Date.now() },
    { text: 'Get candy', key: Date.now() + 1}
  ];

  const [listItems, setListItems] = useState(initListItems);

  return(
    <ListContext.Provider value={[listItems, setListItems]}>
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
    </ListContext.Provider>
  );
}

export default AppContainer;