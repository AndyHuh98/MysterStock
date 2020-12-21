import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Constants from '../Utils/Constants';
import Symbol from './Symbol';

export default function Reel(props) {
  const styles = StyleSheet.create({
    reel: {
      backgroundColor: 'black',
      width: props.width,
      height: props.height,
      marginHorizontal: '1%',
      overflow: 'hidden',
    },
  });

  const symbols = Constants.SYMBOLS;
  const symbolHeight = props.height / Constants.SYMBOLS_ON_REEL;
  const reelSymbols = symbols.repeat(Constants.REELS_REPEAT).split('');

  return (
    <View style={styles.reel}>
      <View style={{width: props.width, height: symbols.length * symbolHeight}}>
        {reelSymbols.map((symbol, index) => {
          return (
            <Symbol
              symbol={symbol}
              key={index}
              width={props.width}
              height={symbolHeight}
            />
          );
        })}
      </View>
    </View>
  );
}
