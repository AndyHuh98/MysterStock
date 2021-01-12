import React, {useContext, useState} from 'react';
import {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import FirebaseContext from '../../Contexts/FirebaseContext';
import GuestView from '../Auth/GuestView';

import {AppBackgroundColor, AppSecondaryColor} from '../Utils/Constants';

export default function FavoritesScreen(props) {
  const firebaseContext = useContext(FirebaseContext);

  const [favorites, setFavorites] = useState(undefined);

  useEffect(() => {
    let favoritesArray = [];

    for (let favorite in firebaseContext.userFavorites) {
      favoritesArray.push({
        symbol: favorite,
        favoritedPrice: firebaseContext.userFavorites[favorite],
      });
    }

    setFavorites(favoritesArray);
  }, [firebaseContext.userFavorites]);

  const renderFavorite = ({item}) => {
    return (
      <Pressable
        delayLongPress={50}
        onLongPress={() => {
          console.log(`Navigating to ${item.symbol} page`);
          props.navigation.navigate('CompanyDisplayFromSearch', {
            companySymbol: item.symbol,
          });
        }}>
        <View style={styles.favoriteCard}>
          <View style={styles.symbolContainer}>
            <Text style={styles.symbolText}>{item.symbol}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.miniHeader}>Price When Added</Text>
            <Text style={styles.priceText}>{item.favoritedPrice}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  if (firebaseContext.loggedIn) {
    if (favorites.length > 0) {
      return (
        <View style={styles.container}>
          <FlatList
            data={favorites}
            renderItem={renderFavorite}
            keyExtractor={(item) => item.symbol}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.noFavoritesContainer}>
          <View style={styles.noFavTextContainer}>
            <Text style={styles.noFavText}>
              You currently have no favorites added! To add a favorite to this
              list, search for or generate a new stock and navigate to the top
              right of its detailed stock view.
            </Text>
          </View>
        </View>
      );
    }
  } else {
    return <GuestView navigation={props.navigation} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
  },
  noFavoritesContainer: {
    backgroundColor: `${AppBackgroundColor}`,
    flex: 1,
    justifyContent: 'center',
  },
  noFavTextContainer: {
    marginHorizontal: '5%',
    backgroundColor: `${AppSecondaryColor}`,
    flex: 0.7,
    borderRadius: 20,
    justifyContent: 'center',
  },
  noFavText: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Dosis-Bold',
    textAlign: 'center',
  },
  favoriteCard: {
    marginVertical: '2%',
    flex: 1,
    marginHorizontal: '10%',
    backgroundColor: `${AppSecondaryColor}`,
    flexDirection: 'row',
    borderRadius: 10,
  },
  symbolContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  symbolText: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Dosis-Bold',
  },
  priceContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    marginRight: '2%',
  },
  priceText: {
    alignSelf: 'flex-end',
    fontSize: 20,
    color: 'white',
    fontFamily: 'Dosis-Medium',
  },
  miniHeader: {
    fontSize: 10,
    alignSelf: 'flex-end',
    color: 'white',
    fontFamily: 'Dosis-Medium',
  },
});
