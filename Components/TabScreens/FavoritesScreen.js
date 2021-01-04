import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import images from '../../assets/images';

export default function FavoritesScreen(props) {
  const [favorites, setFavorites] = useState(undefined);

  // move this fetch of favorites (from firebase) into a provider so that in other screens
  // we can check if a company is favorited already or not.
  // when storing favorites use UID instead of username / email!!

  // also when adding favorites option to companies: make sure to do both CompanyDisplays
  useEffect(() => {
    const favorites_hardcoded = [
      {symbol: 'AAPL', favoritedPrice: 124.22},
      {symbol: 'PLTR', favoritedPrice: 13.33},
      {symbol: 'GME', favoritedPrice: 14.55},
      {symbol: 'TSLA', favoritedPrice: 450.55},
      {symbol: 'ABNB', favoritedPrice: 150.55},
    ];
    setFavorites(favorites_hardcoded);
  }, []);

  const renderFavorite = ({item}) => {
    return (
      <Pressable
        onPressIn={() => {
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.background}
        style={styles.imageBackground}>
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.symbol}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  favoriteCard: {
    marginVertical: '2%',
    flex: 1,
    marginHorizontal: '10%',
    backgroundColor: 'green',
    flexDirection: 'row',
    borderRadius: 10,
  },
  symbolContainer: {
    flex: 0.5,
  },
  symbolText: {
    fontSize: 33,
    alignSelf: 'center',
  },
  priceContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    marginRight: '2%',
  },
  priceText: {
    alignSelf: 'flex-end',
    fontSize: 20,
  },
  miniHeader: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
});
