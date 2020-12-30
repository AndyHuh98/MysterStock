import React, {useMemo, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import CompanyDisplay from './Components/CompanyDisplays/CompanyDisplay';
import MainTabNavigator from './Components/Navigation/MainTabNavigator';
import IEXProvider from './Contexts/IEXProvider';

// TODO: fix react-native-paper require cycle warning
// TODO: add nginx load balancing / routing or whatever it is
// TODO: Add tab icons
// TODO: Change header styling
// TODO: Make app try to reload every x intervals if network request is bad.
// Might have to do this in backend. Google it.
// TODO: Add a search tab where people can just directly search for stocks
// TODO: Add filter for randomizing stocks that meet the filter

/* TODO: Potential Name Bases (make more unique):
  - Lighthouse
  - Oracle
  - Mystery
  - Random
  - Rocket
  - Launch
*/

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

/*
ADJUSTING HEADER STYLES: https://reactnavigation.org/docs/headers
There are three key properties to use when customizing the style of your header: headerStyle, headerTintColor, and headerTitleStyle.

headerStyle: a style object that will be applied to the View that wraps the header. If you set backgroundColor on it, that will be the color of your header.
headerTintColor: the back button and title both use this property as their color. In the example below, we set the tint color to white (#fff) so the back button and the header title would be white.
headerTitleStyle: if we want to customize the fontFamily, fontWeight and other Text style properties for the title, we can use this to do it.
*/

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return useMemo(() => {
    return (
      <NavigationContainer>
        <IEXProvider>
          <Stack.Navigator initialRouteName="MysterStock">
            <Stack.Screen name="Myster Stock" component={MainTabNavigator} />
            <Stack.Screen
              name="CompanyDisplay"
              component={CompanyDisplay}
              options={({route}) => ({
                headerTitle: `${route.params.companySymbol}`,
              })}
            />
          </Stack.Navigator>
        </IEXProvider>
      </NavigationContainer>
    );
  }, []);
};

export default App;
