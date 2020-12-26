import React from 'react';
import {useContext} from 'react';
import {useMemo} from 'react';

import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import IEXContext from '../../Contexts/IEXContext';
import LightWeightCompanyStatsTable from './LightWeightStatsTable';
import LightWeightIntradayStockChart from './LWIntradayStockChart';

// This is the display used in RandomStockScreen. Should be a 'lightweight' version of the main stock page for the stock.
// props passed: navigation, width, companySymbol
export default function PartialCompanyDisplay(props) {
  console.log('PartialCompanyDisplay() Rendering...');
  const iexContext = useContext(IEXContext);

  const cloud_api_key = 'pk_765c2f02d9af4fd28f01fea090e2f544';
  const sandbox_api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a';

  return useMemo(() => {
    const navigateToCompanyDisplay = (company) => {
      console.log(`Navigating to ${company} page.`);
      const navigation = props.navigation;
      navigation.navigate('CompanyDisplay', {
        companySymbol: props.companySymbol,
        companyName: iexContext.companyName,
        width: props.width,
        cloud_api_key: cloud_api_key,
        sandbox_api_key: sandbox_api_key,
      });
    };

    if (iexContext.advStats !== undefined) {
      return (
        <View style={styles.container}>
          <TouchableHighlight
            style={styles.companyNameContainer}
            onPress={() => navigateToCompanyDisplay(props.companySymbol)}>
            <Text style={styles.titleText}>
              {props.companySymbol} : {iexContext.companyName}
            </Text>
          </TouchableHighlight>
          <View style={styles.advStatsContainer}>
            <LightWeightCompanyStatsTable advStats={iexContext.advStats} />
          </View>
          <View style={styles.chartContainer}>
            <LightWeightIntradayStockChart
              width={props.width}
              companySymbol={props.companySymbol}
              api_key={cloud_api_key}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.titleText}>Loading...</Text>
        </View>
      );
    }
  }, [
    iexContext.advStats,
    iexContext.companyName,
    props.companySymbol,
    props.navigation,
    props.width,
  ]);
}

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 10,
    flexDirection: 'column',
  },
  companyNameContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  advStatsContainer: {
    backgroundColor: 'cadetblue',
  },
  chartContainer: {
    flex: 1,
  },
  statsTitle: {
    fontWeight: 'bold',
  },
});
