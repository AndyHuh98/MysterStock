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
    this.reelObjectList = [Constants.REEL_COUNT];
    this.reelHeight = Constants.MAX_HEIGHT * 0.85;
    this.reels = [Constants.REEL_COUNT];
  }

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
    for (let i = 0; i < this.reels.length; i++) {
      this.reels[i].scrollByOffset(10 + i);
    }
  };

  render() {
    return <View style={this.styles.reelGroup}>{this.getReels()}</View>;
  }
}
