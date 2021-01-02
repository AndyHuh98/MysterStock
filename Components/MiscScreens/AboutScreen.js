import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Linking,
  Pressable,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from '../../assets/images';

/*
   import images from '../../assets/images';

  <ImageBackground source={images.background} style={styles.imageBackground}></ImageBackground>

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

*/

export default function AboutScreen(props) {
  const appName = 'Random Stock';
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(true);
  const [coreFeaturesCollapsed, setCoreFeaturesCollapsed] = useState(true);

  const toggleDescriptionCollapsed = () => {
    setDescriptionCollapsed(!descriptionCollapsed);
  };

  const toggleCoreFeaturesCollapsed = () => {
    setCoreFeaturesCollapsed(!coreFeaturesCollapsed);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.background}
        style={styles.imageBackground}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Credits:</Text>
          </View>
          <View style={styles.headerBody}>
            <Text style={styles.body}>Developed by: Andrew He</Text>
            <Text style={styles.body}>Art by: Kohinoor</Text>
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
          </View>
          <View style={styles.divider} />

          <View style={styles.header}>
            <Pressable
              onPressIn={() => toggleDescriptionCollapsed()}
              hitSlop={40}>
              <Text style={styles.title}>What is {appName}?</Text>
            </Pressable>
            <View style={styles.iconContainer}>
              <Ionicons
                name={
                  descriptionCollapsed
                    ? 'chevron-down-circle-outline'
                    : 'chevron-up-circle-outline'
                }
                size={20}
                color="white"
              />
            </View>
          </View>
          <Collapsible collapsed={descriptionCollapsed}>
            <View style={styles.headerBody}>
              <Text style={styles.body}>
                {appName} is a tool that allows users to discover new stocks
                using what is equivalent to a random generator. One of the
                biggest hindrances for investors today is not knowing where to
                look within the maze of resources available online. {appName} is
                a solution that problem, by helping people discover areas and
                stocks that they may not have even dreamt of before. By offering
                a supply of randomly generated stocks, the hope is that this
                tool can find a single stock, sector, or strategy to utilize as
                a as a part of their investing tactics.
              </Text>
            </View>
          </Collapsible>
          <View style={styles.divider} />

          <View style={styles.header}>
            <Pressable
              onPressIn={() => toggleCoreFeaturesCollapsed()}
              hitSlop={40}>
              <Text style={styles.title}>Core Features</Text>
            </Pressable>
            <View style={styles.iconContainer}>
              <Ionicons
                name={
                  coreFeaturesCollapsed
                    ? 'chevron-down-circle-outline'
                    : 'chevron-up-circle-outline'
                }
                size={20}
                color="white"
              />
            </View>
          </View>
          <Collapsible collapsed={coreFeaturesCollapsed}>
            <View style={styles.headerBody}>
              <Text style={styles.body}>
                {appName} offers features such as:
              </Text>
              <Text style={styles.numberedItem}>
                - Generating random stocks
              </Text>
              <Text style={styles.numberedItem}>
                - Stock ticker search for all tickers supported
              </Text>
              <Text style={styles.numberedItem}>
                - Historical and intraday price charts for each ticker
              </Text>
              <Text style={styles.numberedItem}>
                - Draggable charts to view specific points on each chart
              </Text>
              <Text style={styles.numberedItem}>
                - Support for over 100,000 stock tickers
              </Text>
              <Text style={styles.numberedItem}>
                - And more features coming on the way!
              </Text>
            </View>
          </Collapsible>
          <View style={styles.divider} />
        </ScrollView>
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
  header: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  iconContainer: {
    justifyContent: 'center',
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
  },
  numberedItem: {
    marginLeft: '10%',
    fontSize: 13,
    color: 'silver',
    fontStyle: 'italic',
  },
  bodyLink: {
    fontSize: 13,
    color: 'blue',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
