import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StatsTable from '../CompanyDisplays/StatsTable';

// Props passed in: advStats
export default function StatsTableFromSearch(props) {
  if (props.advStats !== null || props.advStats !== undefined) {
    return <StatsTable advStats={props.advStats} />;
  } else {
      return <View></View>
  }
}
