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
    this.reelHeight = Constants.MAX_HEIGHT * 0.75;
    this.reels = [Constants.REEL_COUNT];

    // TODO: remove hardcoding and do API call here, or in a central location and pass it into here.
    this.companySymbolsArray = HARDCODED_COMPANY_SYMBOLS_ARRAY;
    this.companySymbolArray = [4];

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
      this.companySymbolsArray.length - 1,
    );
    const company = this.companySymbolsArray[randomNum];
    this.companySymbolArray = this.companySymbolsArray[randomNum].split('');
    for (let i = 0; i < this.reels.length; i++) {
      let symbol = '';
      if (this.companySymbolArray[i] === undefined) {
        symbol = ' ';
        console.log(' ');
      } else {
        symbol = this.companySymbolArray[i];
        console.log(this.companySymbolArray[i]);
      }
      this.reels[i].scrollToSymbol(symbol, () => {
        this.reelsInMotion -= 1;

        if (this.reelsInMotion === 0) {
          this.evaluateStockOnReel(company, callback);
        }
      });
    }
  };

  // Make a display fade in quickly for company info when this method is called
  // Make display fade away when button is pressed again
  // Display should be clickable for more customizable details page
  evaluateStockOnReel = (company, callback) => {
    callback(company);
  };

  render() {
    return <View style={this.styles.reelGroup}>{this.getReels()}</View>;
  }
}
