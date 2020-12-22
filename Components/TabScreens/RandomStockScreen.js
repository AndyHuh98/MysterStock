import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import ReelGroup from '../Slots/ReelGroup';

export default function RandomStockScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.slotsContainer}>
        <ReelGroup />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="New Stock" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  slotsContainer: {
    flex: 0.85,
    marginTop: '10%',
    marginHorizontal: '3%',
    backgroundColor: 'black',
  },
  buttonContainer: {
    flex: 0.1,
    backgroundColor: 'blue',
    marginTop: '1%',
    marginHorizontal: '3%',
    textAlign: 'center',
    justifyContent: 'center',
  },
});
