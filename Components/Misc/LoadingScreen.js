import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

export default function LoadingScreen(props) {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.loadingContent}
        source={require('../../assets/loading-animations/rocket-6.json')}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingContent: {
    alignSelf: 'center',
  },
});
