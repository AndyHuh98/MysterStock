import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FirebaseContext from '../../Contexts/FirebaseContext';
import {AppBackgroundColor, AppSecondaryColor} from '../Utils/Constants';

export default function MoreScreen(props) {
  const firebaseContext = useContext(FirebaseContext);
  const [searchText, setSearchText] = useState('');

  const FLATLIST_SECTIONS = firebaseContext.loggedIn
    ? [
        {id: 'about', title: 'About'},
        {id: 'faq', title: 'FAQ'},
        {id: 'settings', title: 'Settings'},
        {id: 'profile', title: 'Profile'},
        {id: 'signout', title: 'Sign Out'},
      ]
    : [
        {id: 'about', title: 'About'},
        {id: 'faq', title: 'FAQ'},
        {id: 'settings', title: 'Settings'},
        {id: 'profile', title: 'Profile'},
        {id: 'login', title: 'Login'},
        {id: 'signup', title: 'Sign Up'},
      ];

  // If a user is logged in, only show sign out.
  // If a user is not logged in, only show sign up and login.
  const renderFlatListItem = ({item}) => {
    if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
      return (
        <Pressable
          onPressOut={() => {
            if (item.title !== 'Sign Out') {
              props.navigation.navigate(item.title);
            } else {
              console.log('Signing Out');
              Alert.alert(
                'Signed Out',
                'You have been signed out successfully.',
              );
              firebaseContext.signOut();
            }
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'darkgray' : `${AppSecondaryColor}`,
            },
            styles.card,
          ]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </Pressable>
      );
    }
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
          placeholder="Search..."
          placeholderTextColor="silver"
          onChangeText={(text) => setSearchText(text)}
          clearButtonMode="always"
          fontSize={20}
          color="white"
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={FLATLIST_SECTIONS}
        renderItem={renderFlatListItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
  },
  searchBarContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    borderRadius: 20,
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
    fontFamily: 'Dosis-Medium',
  },
  itemTitle: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Dosis-Medium',
  },
  card: {
    height: 50,
    marginBottom: '1%',
    marginHorizontal: '1%',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
