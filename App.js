import React, {useMemo, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import CompanyDisplay from './Components/CompanyDisplays/CompanyDisplay';
import MainTabNavigator from './Components/Navigation/MainTabNavigator';
import IEXProvider from './Contexts/IEXProvider';
import AboutScreen from './Components/MiscScreens/AboutScreen';
import ProfileScreen from './Components/MiscScreens/ProfileScreen';
import FAQScreen from './Components/MiscScreens/FAQScreen';
import SettingsScreen from './Components/MiscScreens/SettingsScreen';
import CompanyDisplayFromSearch from './Components/CompanyDisplaysFromSearch/CompanyDisplayFromSearch';
import LoginScreen from './Components/Auth/LoginScreen';
import SignUpScreen from './Components/Auth/SignUpScreen';
import ResetPassword from './Components/Auth/ResetPassword';
import FBAuthProvider from './Contexts/FBAuthProvider';

// TODO: !!! show more text on description !!!
// TODO: Clean up search code
// TODO: fix react-native-paper require cycle warning
// TODO: add nginx load balancing / routing or whatever it is
// TODO: Make app try to reload every x intervals if network request is bad.
// Might have to do this in backend. Google it.
// TODO: Add filter for randomizing stocks that meet the filter
// TODO: Fill out FAQ Screen
// TODO: Fill out Settings Screen
// TODO: Fill out profile screen (implement profiles)
// TODO: Implement favorites tab with percentage increase since favorited
// for users that are logged in
// As far as persisting the state and keeping the user logged in, your two options are Redux Persist or AsyncStorage
// TODO: Possibly find some way to consolidate stock chart from search or at least
// reuse code within (historical charts, intraday charts).

/* TODO: Potential Name Bases (make more unique):
  - Lighthouse
  - Oracle
  - Mystery
  - Random
  - Rocket
  - Launch
*/

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return useMemo(() => {
    const getHeaderTitle = (route) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? 'Stock';

      switch (routeName) {
        case 'Stock':
          return 'Discover';
        case 'Search':
          return 'Explore';
        case 'More':
          return 'Mission Control';
        case 'Favorites':
          return 'Mission Log';
      }
    };
    return (
      <FBAuthProvider>
        <SafeAreaView style={styles.safeArea}>
          <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
            <IEXProvider>
              <Stack.Navigator
                initialRouteName="MysterStock"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#04272e',
                  },
                  headerTintColor: 'white',
                }}>
                <Stack.Screen
                  name="Myster Stock"
                  component={MainTabNavigator}
                  options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                  })}
                />
                <Stack.Screen
                  name="CompanyDisplay"
                  component={CompanyDisplay}
                  options={({route}) => ({
                    headerTitle: `${route.params.companySymbol}`,
                  })}
                />
                <Stack.Screen
                  name="CompanyDisplayFromSearch"
                  component={CompanyDisplayFromSearch}
                  options={({route}) => ({
                    headerTitle: `${route.params.companySymbol}`,
                  })}
                />
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="FAQ" component={FAQScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen name="Reset Password" component={ResetPassword} />
              </Stack.Navigator>
            </IEXProvider>
          </NavigationContainer>
        </SafeAreaView>
      </FBAuthProvider>
    );
  }, []);
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#04272e',
  },
});

export default App;
