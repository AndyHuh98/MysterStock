import React, {useContext} from 'react';

import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import IEXContext from '../../Contexts/IEXContext';
import CompanyStockChart from './CompanyStockChart';
import StatsTable from './StatsTable';

const height = Dimensions.get('screen').height * 0.25;

// Props thru route => props.route.params.____ passed: companySymbol, companyName, advStats, width, cloud_api_key, sandbox_api_key
// TODO: pass advStats thru something else, other than route params.
//        this is allegedly an "Anti-pattern" and should pull this array in from
//        some centralized global store
export default function CompanyDisplay(props) {
  const iexContext = useContext(IEXContext);
  const propsParams = props.route.params;

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.chartContainer}>
          <CompanyStockChart
            width={propsParams.width}
            companySymbol={propsParams.companySymbol}
            cloud_api_key={propsParams.cloud_api_key}
            sandbox_api_key={propsParams.sandbox_api_key}
          />
        </View>
        <View style={styles.statsContainer}>
          <StatsTable height={height} advStats={iexContext.advStats} />
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
    flex: 0.3,
  },
  chartContainer: {
    flex: 0.5,
  },
  descriptionContainer: {
    borderColor: 'red',
    borderWidth: 3,
    alignItems: 'center',
    flex: 0.2,
  },
});
