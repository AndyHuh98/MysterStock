import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CompanyDisplay from './Components/CompanyDisplays/CompanyDisplay';
import MainTabNavigator from './Components/Navigation/MainTabNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/*
======EXAMPLE FOR CUSTOM HEADER======

  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Stocks';

    switch (routeName) {
      case TAB_NAMES.stocks:
        return 'Your Stocks';
      case TAB_NAMES.forums:
        return 'Forums';
      case TAB_NAMES.createPost:
        return 'Create A Post';
      case TAB_NAMES.chatMsgs:
        return 'Your Message Rooms';
      case TAB_NAMES.profile:
        return 'Profile';
    }
  };

  <Stack.Screen
    name="Stock Chat"
    component={HomeScreen}
    options={({route}) => ({
      headerTitle: getHeaderTitle(route),
    })}
  />
*/

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Myster Stock" component={MainTabNavigator} />
        <Stack.Screen
          name="CompanyDisplay"
          component={CompanyDisplay}
          options={({route}) => ({
            headerTitle: `${route.params.companySymbol}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
