/* eslint-disable react-native/no-inline-styles */
import React, {
  useEffect,
  useState,
  useMemo,
  useLayoutEffect,
  useContext,
} from 'react';

import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';

import LoadingScreen from '../MiscScreens/LoadingScreen';
import {api_base_url, AppBackgroundColor} from '../Utils/Constants';
import CompanyDescriptionFromSearch from './CompanyDescriptionFromSearch';
import CompanyStockChartFromSearch from './CompanyStockChartFromSearch';
import StatsTableFromSearch from './StatsTableFromSearch';
import FirebaseContext from '../../Contexts/FirebaseContext';

const width = Dimensions.get('screen').width * 0.96;

// Props thru route => props.route.params.____ passed: companySymbol
const CompanyDisplayFromSearch = (props) => {
  const firebaseContext = useContext(FirebaseContext);

  const propsParams = props.route.params;
  const [companyName, setCompanyName] = useState(undefined);
  const [companySymbol, setCompanySymbol] = useState(propsParams.companySymbol);
  const [companyAdvStats, setCompanyAdvStats] = useState(undefined);
  const [companyIntradayData, setCompanyIntradayData] = useState(undefined);
  const [companyInfo, setCompanyInfo] = useState(undefined);
  const [companyPreviousDayData, setCompanyPreviousDayData] = useState(
    undefined,
  );
  const [isFavorited, setIsFavorited] = useState(undefined);

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

  useLayoutEffect(() => {
    const updateUserFavorites = async () => {
      const user = auth().currentUser;

      if (user) {
        const userId = user.uid;
        const filteredData = companyIntradayData.filter(
          (data) => data.average !== null,
        );
        let lastPrice;
        if (filteredData.length > 0) {
          lastPrice = filteredData[filteredData.length - 1].average;
        } else {
          lastPrice = 'N/A';
        }

        console.log(userId);

        const userFavoritesRef = firestore().collection('users').doc(userId);

        if (!isFavorited) {
          // add to favorites
          userFavoritesRef
            .set(
              {
                favorites: {
                  [propsParams.companySymbol]: lastPrice,
                },
              },
              {merge: true},
            )
            .then(() => {
              console.log(
                `${propsParams.companySymbol} added to users/${userId}`,
              );
              setIsFavorited(!isFavorited);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          userFavoritesRef
            .set(
              {
                favorites: {
                  [propsParams.companySymbol]: firebase.firestore.FieldValue.delete(),
                },
              },
              {merge: true},
            )
            .then(() => {
              console.log(
                `${propsParams.companySymbol} removed from users/${userId}`,
              );
              setIsFavorited(!isFavorited);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        Alert.alert('Not Logged In', 'Must be logged in add to favorites!');
      }
    };

    const name = isFavorited ? 'heart' : 'heart-outline';
    props.navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.headerRightBtn}
          onPressIn={() => {
            updateUserFavorites();
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
  }, [
    companyIntradayData,
    isFavorited,
    props.navigation,
    propsParams.companySymbol,
  ]);

  // PROBLEM -- when more pages exist for company display to go back to, this will still change
  // intraday window which may trigger unnecessary fetches
  useEffect(() => {
    let intervalID = null;
    const fetchAllData = async (compSymbol) => {
      const fetchInfo = fetchCompanyInfo(compSymbol);
      const fetchIntradayData = fetchCompanyIntradayData(compSymbol);
      const fetchAdvStats = fetchCompanyAdvStats(compSymbol);
      const fetchPreviousDayData = fetchCompanyPreviousDayData(compSymbol);

      intervalID = setInterval(() => {
        console.log('setting timer for intradaydata SEARCH for ' + compSymbol);
        fetchCompanyIntradayData(compSymbol);
      }, 300000);

      return {
        companyInfoFetched: await fetchInfo,
        intradayDataFetched: await fetchIntradayData,
        advStatsFetched: await fetchAdvStats,
        previousDayDataFetched: await fetchPreviousDayData,
      };
    };

    if (companySymbol !== '') {
      fetchAllData(companySymbol);
      if (companySymbol in firebaseContext.userFavorites) {
        setIsFavorited(true);
      }
    }

    return () => {
      console.log('clearing interval set: SEARCH');
      clearInterval(intervalID);
    };
  }, [companySymbol]);

  return useMemo(() => {
    if (
      companySymbol !== '' &&
      companyAdvStats &&
      companyPreviousDayData &&
      companyIntradayData &&
      companyAdvStats &&
      companyInfo
    ) {
      return (
        <View style={styles.container}>
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
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <LoadingScreen />
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
    fontSize: 17.5,
    fontFamily: 'Dosis-Bold',
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
