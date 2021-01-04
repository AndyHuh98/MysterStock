import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import auth from '@react-native-firebase/auth';

import FBAuthContext from '../../Contexts/FBAuthContext';
import {AppBackgroundColor} from '../Utils/Constants';

export default function MoreScreen(props) {
  const authContext = useContext(FBAuthContext);
  const [searchText, setSearchText] = useState('');

  const FLATLIST_SECTIONS = authContext.loggedIn
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
          onPressIn={() => {
            if (item.title !== 'Sign Out') {
              console.log(`Navigating to ${item.title} Screen`);
              props.navigation.navigate(item.title);
            } else {
              console.log('Signing Out');
              auth().signOut();
            }
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'darkgray' : '#04272e',
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
          autoCorrect={false}
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
  itemTitle: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    height: 50,
    marginBottom: '1%',
    marginHorizontal: '1%',
    justifyContent: 'center',
    borderRadius: 10,
  },
  welcomeUser: {
    flex: 0.3,
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
