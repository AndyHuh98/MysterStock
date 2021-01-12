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
import FirebaseProvider from './Contexts/FirebaseProvider';
import {AppSecondaryColor} from './Components/Utils/Constants';

// TODO: Clean up search code
// TODO: Clean up favorites code
// TODO: fix react-native-paper require cycle warning
// TODO: add nginx load balancing / routing or whatever it is
// TODO: Make app try to reload every x intervals if network request is bad.
// Might have to do this in backend. Google it.
// TODO: Add filter for randomizing stocks that meet the filter
// TODO: Fill out Settings Screen
// As far as persisting the state and keeping the user logged in, your two options are Redux Persist or AsyncStorage
// TODO: Possibly find some way to consolidate stock chart from search or at least
// reuse code within (historical charts, intraday charts).
// TODO: Add donation reminders
// TODO: Add potentially cool text inputs
// TODO: If a user is logged in and has no favorites, show a little blurb with tutorial on how to add to favorites.

/* TODO: Potential Name Bases (make more unique):
  - Lighthouse
  - Oracle
  - Mystery
  - Random
  - Rocket
  - Launch
  - Azimuth
  - Aphelion
  - BlastOff
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
          return 'Favorites Log';
      }
    };
    return (
      <FirebaseProvider>
        <SafeAreaView style={styles.safeArea}>
          <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
            <IEXProvider>
              <Stack.Navigator
                initialRouteName="MysterStock"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: `${AppSecondaryColor}`,
                  },
                  headerTitleStyle: {
                    fontFamily: 'Dosis-Bold',
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
      </FirebaseProvider>
    );
  }, []);
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: `${AppSecondaryColor}`,
  },
});

export default App;
