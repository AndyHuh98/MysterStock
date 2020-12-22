import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Constants from '../Utils/Constants';
import ReelPanel from './ReelPanel';

export default class Reel extends Component {
  constructor(props) {
    super(props);

    this.symbols = Constants.SYMBOLS.split('');
    this.panelHeight = this.props.height / Constants.SYMBOLS_ON_REEL;

    this.styles = StyleSheet.create({
      reel: {
        flex: 0.25,
        backgroundColor: 'white',
        marginHorizontal: '1%',
        overflow: 'hidden',
      },
      scrollingReel: {
        height: this.symbols.length * this.panelHeight,
      },
    });
  }

  getReelPanels = () => {
    const reelPanels = this.symbols.map((symbol, index) => {
      return (
        <ReelPanel
          height={this.panelHeight}
          symbol={symbol}
          index={index}
          key={index}
        />
      );
    });

    return reelPanels;
  };

  render() {
    return (
      <View style={this.styles.reel}>
        <View style={this.styles.scrollingReel}>{this.getReelPanels()}</View>
      </View>
    );
  }
}
