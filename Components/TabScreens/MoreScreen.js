import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Pressable,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import images from '../../assets/images';

export default function MoreScreen(props) {
  const [searchText, setSearchText] = useState('');

  const FLATLIST_SECTIONS = [
    {id: 'about', title: 'About'},
    {id: 'faq', title: 'FAQ'},
    {id: 'settings', title: 'Settings'},
    {id: 'profile', title: 'Profile'},
  ];

  const renderFlatListItem = ({item}) => {
    if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
      return (
        <Pressable
          onPressIn={() => {
            console.log(`Navigating to ${item.title} Screen`);
            props.navigation.navigate(item.title);
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'darkgray' : 'green',
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
      <ImageBackground
        source={images.background}
        style={styles.imageBackground}>
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
});
