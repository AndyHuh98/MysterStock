import React from 'react';

import {View, SafeAreaView, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Collapsible from 'react-native-collapsible';
import StatsTable from './StatsTable';

const height = Dimensions.get('screen').height * 0.25;

// Props thru route => props.route.params.____ passed: companySymbol, companyName, advStats
export default function CompanyDisplay(props) {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.chartContainer} />
        <View style={styles.statsContainer}>
          <StatsTable height={height} advStats={props.route.params.advStats} />
        </View>
        <View style={styles.descriptionContainer} />
      </SafeAreaView>
    </ScrollView>
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
  },
});
