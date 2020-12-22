import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Reel from './Reel';
import Constants from '../Utils/Constants';

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
    this.reelHeight = Constants.MAX_HEIGHT * 0.85;
  }

  getReels = () => {
    for (let i = 0; i < Constants.REEL_COUNT; i++) {
      const reel = <Reel height={this.reelHeight} index={i} key={i} />;
      this.reelList[i] = reel;
    }

    return this.reelList;
  };

  render() {
    return <View style={this.styles.reelGroup}>{this.getReels()}</View>;
  }
}
