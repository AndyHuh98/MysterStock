import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AccountScreen from './Components/TabScreens/AccountScreen';
import RandomStockScreen from './Components/TabScreens/RandomStockScreen';
import CompanyDisplay from './Components/CompanyDisplays/CompanyDisplay';
import MainTabNavigator from './Components/Navigation/MainTabNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Myster Stock" component={MainTabNavigator} />
        <Stack.Screen name="CompanyDisplay" component={CompanyDisplay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
