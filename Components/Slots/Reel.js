import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import Constants from '../Utils/Constants';
import ReelPanel from './ReelPanel';

export default class Reel extends Component {
  constructor(props) {
    super(props);

    this.symbols = Constants.SYMBOLS.repeat(Constants.REELS_REPEAT).split('');
    this.panelHeight = this.props.height / Constants.SYMBOLS_ON_REEL;
    this.currentScrollPos = 0;

    this.state = {
      scrollPos: new Animated.Value(this.currentScrollPos),
    };

    this.styles = StyleSheet.create({
      reel: {
        flex: 0.25,
        backgroundColor: 'white',
        marginHorizontal: '1%',
        overflow: 'hidden',
      },
      scrollingReel: {
        height: this.symbols.length * this.panelHeight,
        transform: [{translateY: this.state.scrollPos}],
      },
    });
  }

  scrollByOffset = (offset) => {
    this.currentScrollPos =
      this.currentScrollPos + -1 * this.panelHeight * offset;
    Animated.timing(this.state.scrollPos, {
      toValue: this.currentScrollPos,
      duration: 750,
      useNativeDriver: true,
    }).start(() => {
      console.log('scrollByOffset()');
    });
  };

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
        <Animated.View style={this.styles.scrollingReel}>
          {this.getReelPanels()}
        </Animated.View>
      </View>
    );
  }
}
