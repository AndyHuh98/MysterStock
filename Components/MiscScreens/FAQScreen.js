import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function FAQScreen(props) {
  return (
    <View style={styles.container}>
      <Text>FAQ Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});