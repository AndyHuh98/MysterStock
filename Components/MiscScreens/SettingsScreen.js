import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import images from '../../assets/images';

export default function SettingsScreen(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.background}
        style={styles.imageBackground}>
        <Text>Settings Screen</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
});
