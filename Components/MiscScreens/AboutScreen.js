import React from 'react';
import {View, ScrollView, Text, StyleSheet, Linking} from 'react-native';
import {AppBackgroundColor} from '../Utils/Constants';

export default function AboutScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Credits:</Text>
        </View>
        <View style={styles.headerBody}>
          <Text style={styles.body}>Developed by: Andrew He</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.header}>
          <Text style={styles.title}>Source Code:</Text>
        </View>
        <View style={styles.headerBody}>
          <Text
            style={styles.bodyLink}
            onPress={() =>
              Linking.openURL('https://github.com/AndyHuh98/MysterStock')
            }>
            Github Repository
          </Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.header}>
          <Text style={styles.title}>Key Tools:</Text>
        </View>
        <View style={styles.headerBody}>
          <Text style={styles.body}>React Native</Text>
          <Text style={styles.body}>Victory Native Charts</Text>
          <Text style={styles.body}>IEX Cloud API</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.header}>
          <Text style={styles.title}>How to Help:</Text>
        </View>
        <View style={styles.headerBody}>
          <Text style={styles.body}>
            - Support API and server hosting costs by donating here:{' '}
            <Text
              style={styles.bodyLink}
              onPress={() =>
                Linking.openURL('https://www.buymeacoffee.com/anduru')
              }>
              BuyMeACoffee
            </Text>
          </Text>
          <Text style={styles.body}>
            - Submit bug reports and check source code at the Github Repository
            linked above!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
  },
  header: {
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Dosis-Bold',
    fontSize: 20,
    color: 'white',
  },
  headerBody: {
    marginHorizontal: '4%',
  },
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  body: {
    fontSize: 13,
    color: 'silver',
    alignSelf: 'center',
    fontFamily: 'Dosis-Medium',
  },
  bodyLink: {
    fontSize: 13,
    color: 'lightblue',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Dosis-Medium',
  },
});
