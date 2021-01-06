import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppBackgroundColor} from '../Utils/Constants';

export default function SettingsScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Settings Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
  },
  titleText: {
    alignSelf: 'center',
    fontFamily: 'Dosis-Bold',
    fontSize: 20,
    color: 'white',
  },
});
