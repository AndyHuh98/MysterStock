import React, {Component} from 'react';
import {Animated, StyleSheet, Easing, ImageBackground} from 'react-native';
import images from '../../assets/images';
import Constants from '../Utils/Constants';
import ReelPanel from './ReelPanel';

export default class Reel extends Component {
  constructor(props) {
    super(props);

    this.symbols = Constants.SYMBOLS.repeat(Constants.REELS_REPEAT).split('');
    this.panelHeight = this.props.height / Constants.PANELS_PER_REEL;
    this.position =
      // -13 is because the position is weird due to flex and other things.
      Constants.SYMBOLS.length * Math.floor(Constants.REELS_REPEAT / 2) - 13;
    this.currentScrollPos = this.position * this.panelHeight * -1;

    this.state = {
      scrollPos: new Animated.Value(this.currentScrollPos),
      currentSymbol: 'a',
    };

    this.styles = StyleSheet.create({
      reel: {
        flex: 0.25,
        overflow: 'hidden',
        justifyContent: 'center',
      },
      scrollingReel: {
        height: this.symbols.length * this.panelHeight,
        transform: [{translateY: this.state.scrollPos}],
      },
    });

    this.isInitialSpin = true;
    this.reelPanelRefs = [];
  }

  scrollToSymbol = (desiredSymbol, callback) => {
    const desiredSymbolValue = Constants.SYMBOLS.split('').findIndex(
      (symbol) => desiredSymbol === symbol,
    );
    const currentSymbolValue = Constants.SYMBOLS.split('').findIndex(
      (symbol) => this.state.currentSymbol === symbol,
    );
    const difference = desiredSymbolValue - currentSymbolValue;
    this.position = this.position - difference;

    // Since tape starts with 'A' at the very top. Not sure why we need the 2 instead of 1 though.
    if (this.isInitialSpin) {
      this.scrollByOffset(difference - 1, callback);
    } else {
      this.scrollByOffset(difference, callback);
    }

    this.setState({
      currentSymbol: Constants.SYMBOLS.split('')[desiredSymbolValue],
    });

    this.isInitialSpin = false;
  };

  scrollByOffset = (offset, callback) => {
    this.currentScrollPos =
      this.currentScrollPos + -1 * this.panelHeight * offset;
    Animated.timing(this.state.scrollPos, {
      toValue: this.currentScrollPos,
      duration: 1500 + this.props.index * 275,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.exp),
    }).start(() => {
      callback();
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
          ref={(ref) => {
            this.reelPanelRefs[index] = ref;
          }}
        />
      );
    });

    return reelPanels;
  };

  render() {
    return (
      <ImageBackground source={images.slotContainer} style={this.styles.reel}>
        <Animated.View style={this.styles.scrollingReel}>
          {this.getReelPanels()}
        </Animated.View>
      </ImageBackground>
    );
  }
}
