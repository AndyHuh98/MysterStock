import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';

export default class ReelPanel extends Component {
  // height, symbol, index, key
  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      panelContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      image: {
        alignSelf: 'center',
        width: '85%',
        height: this.props.height,
      },
    });

    this.symbolSource = this.getSymbolSource();
  }

  getSymbolSource = () => {
    return images[this.props.symbol.toLowerCase()];
  };

  render() {
    return (
      <View style={this.styles.panelContainer}>
        <FastImage
          style={this.styles.image}
          resizeMode="contain"
          source={this.symbolSource}
        />
      </View>
    );
  }
}
