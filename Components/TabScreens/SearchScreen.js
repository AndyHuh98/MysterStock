import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import IEXContext from '../../Contexts/IEXContext';
import {AppBackgroundColor} from '../Utils/Constants';

// TODO: Move search bar into its own component to get practice with this
// TODO: in backend, change return of stockssupported to include company name as well

// pass in iexContext and search array of stocks supported
export default function SearchScreen(props) {
  const iexContext = useContext(IEXContext);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Will have to change this a little bit -- we need to change the symbol
  // from IEXProvider first... figure out some way to separate search and
  // main page display... this will be tough!!
  const navigateToCompanyDisplay = (company) => {
    console.log(`Search Screen: Navigating to ${company} page.`);
    const navigation = props.navigation;
    navigation.navigate('CompanyDisplayFromSearch', {
      companySymbol: company,
    });
  };

  useEffect(() => {
    console.log(searchText);

    const searchStocks = (text) => {
      return iexContext.stocksSupported
        .filter((stock) => {
          return stock.symbol.startsWith(text);
        })
        .slice(0, 5);
    };

    if (searchText !== '') {
      setSearchResults(searchStocks(searchText));
    } else {
      setSearchResults([]);
    }
  }, [iexContext.stocksSupported, searchText]);

  const renderSearchResults = () => {
    return searchResults.map((result) => {
      return (
        <Pressable
          onPressIn={() => {
            console.log(`Will navigate to ${result.symbol} page`);
            navigateToCompanyDisplay(result.symbol);
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'darkgray' : '#04272e',
            },
            styles.resultCard,
          ]}
          key={result.symbol}>
          <Text style={styles.resultSymbol}>{result.symbol}</Text>
        </Pressable>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.iconContainer}>
          <Ionicons
            style={styles.searchIcon}
            size={20}
            name="search-outline"
            color="white"
          />
        </View>
        <TextInput
          placeholder="Search for a stock..."
          placeholderTextColor="silver"
          onChangeText={(text) => setSearchText(text)}
          autoCorrect={false}
          autoCapitalize="characters"
          clearButtonMode="always"
          fontSize={20}
          color="white"
          style={styles.searchInput}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.resultsContainer}>
        {renderSearchResults()}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
  },
  searchBarContainer: {
    flex: 0.1,
    borderRadius: 10,
    borderWidth: 3,
    marginHorizontal: '10%',
    marginVertical: '5%',
    flexDirection: 'row',
    alignContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    flex: 0.1,
  },
  searchIcon: {
    alignSelf: 'center',
  },
  searchInput: {
    flex: 0.9,
  },
  resultsContainer: {
    flex: 0.9,
    backgroundColor: 'transparent',
    marginHorizontal: '5%',
  },
  resultCard: {
    marginHorizontal: '2%',
    marginVertical: '1%',
    flex: 0.15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  resultSymbol: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
