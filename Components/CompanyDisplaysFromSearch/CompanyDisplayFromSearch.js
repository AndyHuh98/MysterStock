import React, {useEffect, useState, useMemo} from 'react';

import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  ImageBackground,
} from 'react-native';
import images from '../../assets/images';
import LoadingScreen from '../MiscScreens/LoadingScreen';
import {api_base_url} from '../Utils/Constants';
import CompanyDescriptionFromSearch from './CompanyDescriptionFromSearch';
import CompanyStockChartFromSearch from './CompanyStockChartFromSearch';
import StatsTableFromSearch from './StatsTableFromSearch';

const width = Dimensions.get('screen').width * 0.96;

// Props thru route => props.route.params.____ passed: companySymbol
const CompanyDisplayFromSearch = (props) => {
  const propsParams = props.route.params;
  const [companyName, setCompanyName] = useState(undefined);
  const [companySymbol, setCompanySymbol] = useState(propsParams.companySymbol);
  const [companyAdvStats, setCompanyAdvStats] = useState(undefined);
  const [companyIntradayData, setCompanyIntradayData] = useState(undefined);
  const [companyInfo, setCompanyInfo] = useState(undefined);
  const [companyPreviousDayData, setCompanyPreviousDayData] = useState(
    undefined,
  );

  async function fetchCompanyInfo(compSymbol) {
    const companyInfoFetchURL = `${api_base_url}/company?symbol=${compSymbol}`;
    console.log('CompanyDisplayFromSearch(): ' + companyInfoFetchURL);

    try {
      await fetch(companyInfoFetchURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setCompanyInfo(responseJson);
        });
    } catch (error) {
      console.error('ERROR: ' + error);
    }
  }

  async function fetchCompanyAdvStats(compSymbol) {
    const advStatsFetchURL = `${api_base_url}/advstats?symbol=${compSymbol}`;
    console.log('CompanyDisplayFromSearch(): ' + advStatsFetchURL);
    let advStats = [];

    try {
      await fetch(advStatsFetchURL)
        .then((response) => response.json())
        .then((responseJson) => {
          advStats = responseJson;
          setCompanyName(advStats.companyName);
          setCompanyAdvStats(advStats);
        });
    } catch (error) {
      console.error('ERROR: ' + error);
    }
  }

  async function fetchCompanyIntradayData(compSymbol) {
    const companyIntradayURL = `${api_base_url}/intradaydata?symbol=${compSymbol}`;
    console.log('CompanyDisplayFromSearch(): ' + companyIntradayURL);

    try {
      await fetch(companyIntradayURL)
        .then((response) => response.json())
        .then((responseJson) => {
          let filteredData = [];
          filteredData = responseJson.filter((dataPoint) => {
            let minutes = parseInt(dataPoint.minute.split(':')[1], 10);
            // can make graph more detailed by changing the modulo here
            return (
              (minutes % 4 === 0 || minutes % 5 === 0) &&
              dataPoint.average !== null
            );
          });
          setCompanyIntradayData(filteredData);
        });
    } catch (error) {
      console.error('ERROR: ' + error);
    }
  }

  async function fetchCompanyPreviousDayData(compSymbol) {
    const companyPreviousDayDataURL = `${api_base_url}/previous?symbol=${compSymbol}`;
    console.log('CompanyDisplayFromSearch(): ' + companyPreviousDayDataURL);

    try {
      await fetch(companyPreviousDayDataURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setCompanyPreviousDayData(responseJson);
        });
    } catch (error) {
      console.error('ERROR: ' + error);
    }
  }

  // PROBLEM -- when more pages exist for company display to go back to, this will still change
  // intraday window which may trigger unnecessary fetches
  useEffect(() => {
    let intervalID = null;
    const fetchAllData = async (compSymbol) => {
      const fetchInfo = fetchCompanyInfo(compSymbol);
      const fetchAdvStats = fetchCompanyAdvStats(compSymbol);
      const fetchPreviousDayData = fetchCompanyPreviousDayData(compSymbol);

      intervalID = setInterval(() => {
        console.log('setting timer for intradaydata SEARCH for ' + compSymbol);
        fetchCompanyIntradayData(compSymbol);
      }, 300000);

      return {
        companyInfoFetched: await fetchInfo,
        advStatsFetched: await fetchAdvStats,
        previousDayDataFetched: await fetchPreviousDayData,
      };
    };

    if (companySymbol !== '') {
      fetchAllData(companySymbol);
    }

    return () => {
      console.log('clearing interval set: SEARCH');
      clearInterval(intervalID);
    };
  }, [companySymbol]);

  return useMemo(() => {
    if (
      companySymbol !== '' &&
      companyAdvStats !== undefined &&
      companyPreviousDayData !== undefined &&
      companyIntradayData !== undefined &&
      companyAdvStats !== undefined
    ) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={images.background}
            style={styles.imageBackGround}>
            <SafeAreaView style={styles.safeContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.companyName}>{companyName}</Text>
              </View>
              <ScrollView style={styles.scrollContainer}>
                <View style={styles.chartContainer}>
                  <CompanyStockChartFromSearch
                    width={width}
                    companySymbol={companySymbol}
                    companyPreviousDayData={companyPreviousDayData}
                    companyIntradayData={companyIntradayData}
                  />
                </View>
                <View style={styles.statsContainer}>
                  <StatsTableFromSearch advStats={companyAdvStats} />
                </View>
                <View style={styles.descriptionContainer}>
                  <CompanyDescriptionFromSearch companyInfo={companyInfo} />
                </View>
              </ScrollView>
            </SafeAreaView>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={images.background}
            style={styles.imageBackGround}>
            <LoadingScreen />
          </ImageBackground>
        </View>
      );
    }
  }, [
    companySymbol,
    companyAdvStats,
    companyPreviousDayData,
    companyIntradayData,
    companyName,
    companyInfo,
  ]);
};

export default CompanyDisplayFromSearch;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  imageBackGround: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'green',
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
