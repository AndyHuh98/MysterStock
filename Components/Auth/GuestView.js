import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {AppBackgroundColor} from '../Utils/Constants';
import LoginScreen from './LoginScreen';

export default function GuestView(props) {
  return (
    <View style={styles.container}>
      <LoginScreen navigation={props.navigation} />
      <Text style={styles.guestText}>
        Thank you for using the application. To enjoy additional features such
        as this one, consider signing up or logging in.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
  },
  guestText: {
    alignSelf: 'center',
    color: 'white',
    fontStyle: 'italic',
    fontFamily: 'Dosis-Medium',
  },
});
