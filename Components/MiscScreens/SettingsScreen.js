import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SettingsScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});