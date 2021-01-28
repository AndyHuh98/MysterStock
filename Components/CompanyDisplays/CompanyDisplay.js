import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';

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

import IEXContext from '../../Contexts/IEXContext';
import CompanyDescription from './CompanyDescription';
import CompanyStockChart from './CompanyStockChart';
import StatsTable from './StatsTable';
import {AppBackgroundColor} from '../Utils/Constants';
import FirebaseContext from '../../Contexts/FirebaseContext';

const height = Dimensions.get('screen').height * 0.25;
// Props thru route => props.route.params.____ passed: companySymbol, companyName, width
const CompanyDisplay = (props) => {
  const firebaseContext = useContext(FirebaseContext);
  const iexContext = useContext(IEXContext);

  const propsParams = props.route.params;
  const [isFavorited, setIsFavorited] = useState(undefined);

  // PROBLEM -- when more pages exist for company display to go back to, this will still change
  // intraday window which may trigger unnecessary fetches
  useEffect(() => {
    if (propsParams.companySymbol in firebaseContext.userFavorites) {
      setIsFavorited(true);
    }

    return () => {
      iexContext.changeChartHistoryWindow('1d');
    };
  }, [iexContext, propsParams.companySymbol]);

  useLayoutEffect(() => {
    const updateUserFavorites = async () => {
      const user = auth().currentUser;

      if (user) {
        const userId = user.uid;
        const filteredData = iexContext.companyIntradayData.filter(
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
            // get array of favorited from DB
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
    isFavorited,
    props.navigation,
    propsParams.companySymbol,
    firebaseContext.userFavorites,
    iexContext.companyIntradayData,
  ]);

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
