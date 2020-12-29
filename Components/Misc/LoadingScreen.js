import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export default function LoadingScreen(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    alignSelf: 'center',
  },
});
