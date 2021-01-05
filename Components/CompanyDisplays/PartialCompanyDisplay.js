import React from 'react';
import {useContext} from 'react';
import {useMemo} from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import images from '../../assets/images';
import IEXContext from '../../Contexts/IEXContext';
import {AppSecondaryColor} from '../Utils/Constants';
import LightWeightCompanyStatsTable from './LightWeightStatsTable';
import LightWeightIntradayStockChart from './LWIntradayStockChart';

// This is the display used in RandomStockScreen. Should be a 'lightweight' version of the main stock page for the stock.
// props passed: navigation, width, companySymbol
export default function PartialCompanyDisplay(props) {
  const iexContext = useContext(IEXContext);

  return useMemo(() => {
    const navigateToCompanyDisplay = (company) => {
      console.log(`PartialCompanyDisplay: Navigating to ${company} page.`);
      const navigation = props.navigation;
      navigation.navigate('CompanyDisplay', {
        companySymbol: props.companySymbol,
        companyName: iexContext.companyName,
        width: props.width,
      });
    };

    if (iexContext.advStats !== undefined) {
      return (
        <ScrollView style={styles.container}>
          <TouchableHighlight
            style={styles.companyNameContainer}
            onPress={() => navigateToCompanyDisplay(props.companySymbol)}>
            <Text style={styles.titleText}>
              {props.companySymbol}: {iexContext.companyName}
            </Text>
          </TouchableHighlight>
          <View style={styles.advStatsContainer}>
            <LightWeightCompanyStatsTable advStats={iexContext.advStats} />
          </View>
          <View source={images.chartContainer} style={styles.chartContainer}>
            <LightWeightIntradayStockChart width={props.width} />
          </View>
        </ScrollView>
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
    borderColor: 'black',
    borderRadius: 10,
    flexDirection: 'column',
  },
  companyNameContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  chartContainer: {
    flex: 1,
    backgroundColor: `${AppSecondaryColor}`,
    borderRadius: 10,
    marginHorizontal: '3%',
  },
  statsTitle: {
    fontWeight: 'bold',
  },
});
