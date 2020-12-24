import React from 'react';

import {View, SafeAreaView, Text, StyleSheet, ScrollView} from 'react-native';
import StatsTable from './StatsTable';

// Props thru route => props.route.params.____ passed: companySymbol, companyName, advStats
export default function CompanyDisplay(props) {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.chartContainer}></View>
        <View style={styles.statsContainer}>
          <StatsTable advStats={props.route.params.advStats}/> 
        </View>
        <View style={styles.descriptionContainer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  statsContainer: {
    borderColor: 'pink',
    borderWidth: 3,
    flex: 0.3,
  },
  chartContainer: {
    borderColor: 'blue',
    borderWidth: 3,
    flex: 0.5,
    alignItems: 'center',
  },
  descriptionContainer: {
    borderColor: 'red',
    borderWidth: 3,
    alignItems: 'center',
    flex: 0.2,
  }
});
