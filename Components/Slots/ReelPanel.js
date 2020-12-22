import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import images from '../../assets/images';

export default class ReelPanel extends Component {
  // height, symbol, index, key
  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      panelContainer: {
        backgroundColor: 'red',
        flex: 1,
        marginVertical: '1%',
        justifyContent: 'center',
      },
      image: {
        width: '85%',
        height: this.props.height * 0.75,
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
        <Image
          style={this.styles.image}
          resizeMode="contain"
          source={this.symbolSource}
        />
      </View>
    );
  }
}
