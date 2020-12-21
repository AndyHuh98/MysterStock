import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import ReelGroup from '../Slots/ReelGroup';
import Constants from '../Utils/Constants';

export default function RandomStockScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.playContainer}>
        <ReelGroup
          width={styles.playContainer.width}
          height={styles.playContainer.height}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="New Stock" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  buttonContainer: {
    flex: 0.5,
    height: 60,
    width: Constants.MAX_WIDTH,
    backgroundColor: 'purple',
    marginBottom: 60,
  },
  playContainer: {
    flex: 9.5,
    height: Constants.MAX_HEIGHT,
    width: Constants.MAX_WIDTH,
    backgroundColor: 'blue',
  },
});
