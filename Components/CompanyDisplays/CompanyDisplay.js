import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';

import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import IEXContext from '../../Contexts/IEXContext';
import CompanyDescription from './CompanyDescription';
import CompanyStockChart from './CompanyStockChart';
import StatsTable from './StatsTable';
import {AppBackgroundColor} from '../Utils/Constants';

const height = Dimensions.get('screen').height * 0.25;
// Props thru route => props.route.params.____ passed: companySymbol, companyName, width
const CompanyDisplay = (props) => {
  const iexContext = useContext(IEXContext);
  const propsParams = props.route.params;
  const [isFavorited, setIsFavorited] = useState(undefined);

  // PROBLEM -- when more pages exist for company display to go back to, this will still change
  // intraday window which may trigger unnecessary fetches
  useEffect(() => {
    return () => {
      iexContext.changeChartHistoryWindow('1d');
    };
  }, []);

  const updateUserFavorites = () => {
    
  }

  useLayoutEffect(() => {
    const name = isFavorited ? 'heart' : 'heart-outline';
    props.navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.headerRightBtn}
          onPressIn={() => {
            // get array of favorited from DB, then
            setIsFavorited(!isFavorited);
          }}>
          <Ionicons
            name={name}
            size={30}
            color="lightcoral"
            style={{marginRight: 20}}
          />
        </Pressable>
      ),
    });
  }, [isFavorited, props.navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.companyName}>{iexContext.companyName}</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CompanyDisplay;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
  },
  safeContainer: {
    flex: 1,
    marginHorizontal: '2%',
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
    marginTop: '5%',
  },
  descriptionContainer: {
    flex: 0.2,
    marginTop: '5%',
  },
});
