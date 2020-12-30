import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RandomStockScreen from '../TabScreens/RandomStockScreen';
import AccountScreen from '../TabScreens/AccountScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator(props) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Stock') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'gray',
      }}>
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
