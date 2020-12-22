import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Reel from './Reel';
import Constants from '../Utils/Constants';
import {HARDCODED_COMPANY_SYMBOLS_ARRAY} from '../Utils/Constants';

export default class ReelGroup extends Component {
  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      reelGroup: {
        flex: 1,
        flexDirection: 'row',
      },
    });

    this.reelList = [Constants.REEL_COUNT];
    this.reelObjectList = [Constants.REEL_COUNT];
    this.reelHeight = Constants.MAX_HEIGHT * 0.85;
    this.reels = [Constants.REEL_COUNT];

    this.companySymbolsArray = HARDCODED_COMPANY_SYMBOLS_ARRAY;
    this.companySymbolArray = [4];
  }

  randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  getReels = () => {
    for (let i = 0; i < Constants.REEL_COUNT; i++) {
      const reel = (
        <Reel
          height={this.reelHeight}
          index={i}
          key={i}
          ref={(ref) => {
            this.reels[i] = ref;
          }}
        />
      );
      this.reelList[i] = reel;
    }

    return <>{this.reelList}</>;
  };

  spin = () => {
    const randomNum = this.randomBetween(
      0,
      this.companySymbolsArray.length - 1,
    );
    console.log(randomNum);
    this.companySymbolArray = this.companySymbolsArray[randomNum].split('');
    for (let i = 0; i < this.reels.length; i++) {
      if (this.companySymbolArray[i] === undefined) {
        this.reels[i].scrollToSymbol(' ');
      } else {
        this.reels[i].scrollToSymbol(this.companySymbolArray[i]);
      }
    }
  };

  render() {
    return <View style={this.styles.reelGroup}>{this.getReels()}</View>;
  }
}
