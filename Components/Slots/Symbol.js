import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import images from '../../assets/images';

export default function Symbol(props) {
  const styles = StyleSheet.create({
    symbol: {
      backgroundColor: 'blue',
      width: props.width,
      height: props.height,
      marginVertical: '1%',
    },
  });

  const getSymbolImage = () => {
    return images[props.symbol.toLowerCase()];
  };

  const symbolSource = getSymbolImage();

  return (
    <View style={styles.symbol}>
      <Image
        resizeMode="contain"
        source={symbolSource}
        style={{width: props.width, height: props.height}}
      />
    </View>
  );
}
