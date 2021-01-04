import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RandomStockScreen from '../TabScreens/RandomStockScreen';
import MoreScreen from '../TabScreens/MoreScreen';
import SearchScreen from '../TabScreens/SearchScreen';
import FavoritesScreen from '../TabScreens/FavoritesScreen';

const Tab = createBottomTabNavigator();

// To change navigation color: this file
// to change header color: app.js screenoptions in Stack.Navigator
// to change safearea color (black): app.js styles.safeArea
export default function MainTabNavigator(props) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Stock') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'More') {
            iconName = focused
              ? 'ellipsis-horizontal-circle'
              : 'ellipsis-horizontal-circle-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search-circle' : 'search-circle-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart-circle' : 'heart-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#04272e',
        inactiveBackgroundColor: '#04272e',
      }}>
      <Tab.Screen
        name="Stock"
        children={() => <RandomStockScreen navigation={props.navigation} />}
      />
      <Tab.Screen
        name="Favorites"
        children={() => <FavoritesScreen navigation={props.navigation} />}
      />
      <Tab.Screen
        name="Search"
        children={() => <SearchScreen navigation={props.navigation} />}
      />
      <Tab.Screen
        name="More"
        children={() => <MoreScreen navigation={props.navigation} />}
      />
    </Tab.Navigator>
  );
}
