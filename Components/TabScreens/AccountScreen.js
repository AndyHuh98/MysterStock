import {useState} from 'react';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function AccountScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Account Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
