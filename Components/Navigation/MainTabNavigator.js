import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import RandomStockScreen from '../TabScreens/RandomStockScreen';
import AccountScreen from '../TabScreens/AccountScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Stock"
        children={() => <RandomStockScreen navigation={props.navigation} />}
      />
      <Tab.Screen
        name="Account"
        children={() => <AccountScreen navigation={props.navigation} />}
      />
    </Tab.Navigator>
  );
}
