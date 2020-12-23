import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import LightWeightCompanyStatsTable from './LightWeightStatsTable';
import LightWeightIntradayStockChart from './LWIntradayStockChart';

// This is the display used in RandomStockScreen. Should be a 'lightweight' version of the main stock page for the stock.
export default function PartialCompanyDisplay(props) {
  console.log('PartialCompanyDisplay() Rendering...');

  const cloud_api_key = 'pk_765c2f02d9af4fd28f01fea090e2f544';
  const sandbox_api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a';
  const companySymbol = props.companySymbol;

  const [companyName, setCompanyName] = useState('');
  const [companyAdvStats, setCompanyAdvStats] = useState([]);
  const [initialPageRender, setInitialPageRender] = useState(true);

  const fetchCompanyInfo = async (api_key, compSymbol) => {
    const companyInfoURL = `https://sandbox.iexapis.com/stable/stock/${compSymbol}/company?token=${api_key}`;
    console.log(companyInfoURL);
    let companyInfo = [];

    await fetch(companyInfoURL)
      .then((response) => response.json())
      .then((responseJson) => {
        companyInfo = responseJson;
      })
      .then(() => {
        console.log('COMPANY INFO:');
        console.log(companyInfo);
      });
  };

  const fetchCompanyAdvStats = async (api_key, compSymbol) => {
    const advStatsFetchURL = `https://sandbox.iexapis.com/stable/stock/${compSymbol}/advanced-stats?token=${api_key}`;
    console.log(advStatsFetchURL);
    let advStats = [];

    await fetch(advStatsFetchURL)
      .then((response) => response.json())
      .then((responseJson) => {
        advStats = responseJson;
        setCompanyAdvStats(advStats);
        setCompanyName(advStats.companyName);
      })
      .then(() => {
        console.log('ADV STATS:');
        console.log(companyAdvStats);
      });
  };

  // Will re-render the display each time a new company is obtained from slots
  useEffect(() => {
    if (!initialPageRender) {
      fetchCompanyAdvStats(sandbox_api_key, props.companySymbol);
    }

    setInitialPageRender(false);
  }, [props.companySymbol]);

  const navigateToCompanyDisplay = (company) => {
    console.log(`Navigating to ${company} page.`);
    const navigation = props.navigation;
    navigation.navigate('CompanyDisplay', {
      companySymbol: props.companySymbol,
      companyName: companyName,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.companyNameContainer}
        onPress={() => navigateToCompanyDisplay(props.companySymbol)}>
        <Text style={styles.titleText}>
          {props.companySymbol} : {companyName}
        </Text>
      </TouchableHighlight>
      <View style={styles.advStatsContainer}>
        <LightWeightCompanyStatsTable advStats={companyAdvStats} />
      </View>
      <View style={styles.chartContainer}>
        <LightWeightIntradayStockChart
          width={props.width}
          initialPageRender={initialPageRender}
          companySymbol={props.companySymbol}
          api_key={cloud_api_key}
        />
      </View>
    </View>
  );
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
