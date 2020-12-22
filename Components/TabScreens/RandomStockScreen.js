import React, {useRef} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import ReelGroup from '../Slots/ReelGroup';

// Implement SPIN Function using ReelGroup Spin within Functional Component
export default function RandomStockScreen(props) {
  const reelGroup = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.slotsContainer}>
        <ReelGroup ref={reelGroup} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="New Stock" onPress={() => reelGroup.current.spin()} />
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
