import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Reel from './Reel';
import Constants from '../Utils/Constants';

// TODO: Make letters show up BEFORE loading in all stocks
// TODO: disable button while stocks still loading (throws error if you press before loaded fully)
// props passed in: companySymbolsArray
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
    this.reelHeight = Constants.MAX_HEIGHT * 0.55;
    this.reels = [Constants.REEL_COUNT];

    this.companySymbolChars = [4];

    this.reelsInMotion = Constants.REEL_COUNT;
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

  spin = (callback) => {
    this.reelsInMotion = Constants.REEL_COUNT;
    const randomNum = this.randomBetween(
      0,
      this.props.companySymbolsArray.length - 1,
    );
    const company = this.props.companySymbolsArray[randomNum];
    this.companySymbolChars = this.props.companySymbolsArray[randomNum].split(
      '',
    );
    for (let i = 0; i < this.reels.length; i++) {
      let symbol = '';
      if (this.companySymbolChars[i] === undefined) {
        symbol = ' ';
      } else {
        symbol = this.companySymbolChars[i];
      }
      this.reels[i].scrollToSymbol(symbol, () => {
        this.reelsInMotion -= 1;

        if (this.reelsInMotion === 0) {
          this.evaluateStockOnReel(company, callback);
        }
      });
    }
  };

  evaluateStockOnReel = (company, callback) => {
    callback(company);
  };

  render() {
    return <View style={this.styles.reelGroup}>{this.getReels()}</View>;
  }
}
