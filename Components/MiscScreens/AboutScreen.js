import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import images from '../../assets/images';

/*
   import images from '../../assets/images';

  <ImageBackground source={images.background} style={styles.imageBackground}></ImageBackground>

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

*/

export default function AboutScreen(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.background}
        style={styles.imageBackground}>
        <View style={styles.header}>
          <Text style={styles.title}>Credits:</Text>
        </View>
        <View style={styles.headerBody}>
          <Text style={styles.body}>Developed by: Andrew He</Text>
        </View>
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
  header: {
    marginTop: '5%',
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  headerBody: {
    marginHorizontal: '2%',
  },
  body: {
    fontSize: 13,
    color: 'silver',
    alignSelf: 'center',
  },
});
