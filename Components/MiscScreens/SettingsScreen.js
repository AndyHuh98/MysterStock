import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppBackgroundColor, AppSecondaryColor} from '../Utils/Constants';

// TODO: Clear favorites

export default function SettingsScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Settings Screen</Text>
      <View style={styles.noSettingsContainer}>
        <Text style={styles.noSettingsText}>
          Light mode and dark mode toggle coming soon.
        </Text>
      </View>
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
  noSettingsContainer: {
    marginHorizontal: '5%',
    flex: 0.5,
    backgroundColor: `${AppSecondaryColor}`,
    justifyContent: 'center',
    borderRadius: 20,
  },
  noSettingsText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Dosis-Bold',
    textAlign: 'center',
  },
});
