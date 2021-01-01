import React, {useContext} from 'react';
import {useEffect} from 'react';

import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';
import IEXContext from '../../Contexts/IEXContext';
import CompanyDescription from './CompanyDescription';
import CompanyStockChart from './CompanyStockChart';
import StatsTable from './StatsTable';

const height = Dimensions.get('screen').height * 0.25;
// Props thru route => props.route.params.____ passed: companySymbol, companyName, width
const CompanyDisplay = (props) => {
  const iexContext = useContext(IEXContext);
  const propsParams = props.route.params;

  // PROBLEM -- when more pages exist for company display to go back to, this will still change
  // intraday window which may trigger unnecessary fetches
  useEffect(() => {
    return () => {
      iexContext.changeChartHistoryWindow('1d');
    };
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.companyName}>{iexContext.companyName}</Text>
        </View>
        <View style={styles.chartContainer}>
          <CompanyStockChart
            width={propsParams.width}
            companySymbol={propsParams.companySymbol}
          />
        </View>
        <View style={styles.statsContainer}>
          <StatsTable height={height} advStats={iexContext.advStats} />
        </View>
        <View style={styles.descriptionContainer}>
          <CompanyDescription />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CompanyDisplay;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
    marginHorizontal: '3%',
  },
  titleContainer: {
    flex: 0.1,
  },
  companyName: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  chartContainer: {
    flex: 0.5,
  },
  statsContainer: {
    flex: 0.3,
    marginTop: '1%',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
  },
  descriptionContainer: {
    flex: 0.2,
    marginTop: '1%',
  },
});
