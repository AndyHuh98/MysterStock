import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppBackgroundColor} from '../Utils/Constants';

export default function FAQScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FAQ Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
  },
  text: {
    color: 'white',
  },
});
