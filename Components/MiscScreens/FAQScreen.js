import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import images from '../../assets/images';


export default function FAQScreen(props) {
  return (
    <View style={styles.container}>
      <ImageBackground source={images.background} style={styles.imageBackground}>
        <Text>FAQ Screen</Text>
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
