import React, {useMemo, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import CompanyDisplay from './Components/CompanyDisplays/CompanyDisplay';
import MainTabNavigator from './Components/Navigation/MainTabNavigator';
import IEXProvider from './Contexts/IEXProvider';

// TODO: fix react-native-paper require cycle warning
// TODO: add nginx load balancing / routing or whatever it is
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
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return useMemo(() => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <IEXProvider>
            <Stack.Navigator
              initialRouteName="MysterStock"
              screenOptions={{
                headerStyle: {
                  backgroundColor: 'green',
                },
                headerTintColor: 'white',
              }}>
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
      </SafeAreaView>
    );
  }, []);
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'green',
  },
});

export default App;
