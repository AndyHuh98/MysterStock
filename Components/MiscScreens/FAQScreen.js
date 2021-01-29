import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppBackgroundColor, APP_NAME} from '../Utils/Constants';

export default function FAQScreen(props) {
  const appName = APP_NAME;
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(true);
  const [coreFeaturesCollapsed, setCoreFeaturesCollapsed] = useState(true);
  const [howToHelpCollapsed, setHowToHelpCollapsed] = useState(false);
  const [dataDiscrepancyCollapsed, setDataDiscrepancyCollapsed] = useState(
    true,
  );
  const [liveUpdateCollapsed, setLiveUpdateCollapsed] = useState(true);

  const toggleDescriptionCollapsed = () => {
    setDescriptionCollapsed(!descriptionCollapsed);
  };

  const toggleCoreFeaturesCollapsed = () => {
    setCoreFeaturesCollapsed(!coreFeaturesCollapsed);
  };

  const toggleHowToHelpCollapsed = () => {
    setHowToHelpCollapsed(!howToHelpCollapsed);
  };

  const toggleDataDiscrepancyCollapsed = () => {
    setDataDiscrepancyCollapsed(!dataDiscrepancyCollapsed);
  };

  const toggleLiveUpdateCollapsed = () => {
    setLiveUpdateCollapsed(!liveUpdateCollapsed);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Pressable onPressIn={() => toggleHowToHelpCollapsed()}>
            <Text style={styles.title}>How To Help</Text>
          </Pressable>
          <View style={styles.iconContainer}>
            <Ionicons
              name={
                howToHelpCollapsed
                  ? 'chevron-down-circle-outline'
                  : 'chevron-up-circle-outline'
              }
              size={20}
              color="white"
            />
          </View>
        </View>
        <Collapsible collapsed={howToHelpCollapsed}>
          <View style={styles.headerBody}>
            <Text style={styles.body}>
              BlastOff is supported and hosted by a one person team, trying to
              keep the service free of charge for all retail investors, for all
              time. Please help keep this dream alive and support BlastOff's API
              and server hosting costs by donating here:{' '}
            </Text>
            <Text
              style={styles.bodyLink}
              onPress={() =>
                Linking.openURL('https://www.buymeacoffee.com/anduru')
              }>
              BuyMeACoffee
            </Text>
          </View>
        </Collapsible>
        <View style={styles.divider} />

        <View style={styles.header}>
          <Pressable onPressIn={() => toggleDescriptionCollapsed()}>
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
              {appName} is a tool that allows users to discover new stocks using
              what is equivalent to a random generator. One of the biggest
              hindrances for investors today is not knowing where to look within
              the maze of resources available online. {appName} is a solution
              for that problem, by helping people discover areas and stocks that
              they may not have even dreamt of before. By offering a supply of
              randomly generated stocks, the hope is that this tool can be used
              to find even a single stock, sector, or strategy that will be
              useful in our users' daily investing.
            </Text>
          </View>
        </Collapsible>
        <View style={styles.divider} />

        <View style={styles.header}>
          <Pressable onPressIn={() => toggleCoreFeaturesCollapsed()}>
            <Text style={styles.title}>Features</Text>
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
            <Text style={styles.numberedItem}>- Generate random stocks</Text>
            <Text style={styles.numberedItem}>
              - Search for specific stocks over all tickers supported
            </Text>
            <Text style={styles.numberedItem}>
              - Historical and intraday price charts for each ticker
            </Text>
            <Text style={styles.numberedItem}>
              - Advanced statistics for each supported stock ticker
            </Text>
            <Text style={styles.numberedItem}>
              - Draggable charts to view specific points on each chart
            </Text>
            <Text style={styles.numberedItem}>
              - Support for over 100,000 stock tickers
            </Text>
            <Text style={styles.numberedItem}>
              - Ability to add stocks to a list of favorites, with the price at
              time of favoriting logged for future reference.
            </Text>
            <Text style={styles.numberedItem}>
              - And more features coming on the way!
            </Text>
          </View>
        </Collapsible>
        <View style={styles.divider} />

        <View style={styles.header}>
          <Pressable onPressIn={() => toggleDataDiscrepancyCollapsed()}>
            <Text style={styles.title}>Data Discrepancy Disclaimer</Text>
          </Pressable>
          <View style={styles.iconContainer}>
            <Ionicons
              name={
                dataDiscrepancyCollapsed
                  ? 'chevron-down-circle-outline'
                  : 'chevron-up-circle-outline'
              }
              size={20}
              color="white"
            />
          </View>
        </View>
        <Collapsible collapsed={dataDiscrepancyCollapsed}>
          <View style={styles.headerBody}>
            <Text style={styles.body}>
              There may be a slightly noticeable data discrepancy (margins of
              less than 1% in some cases) in comparison to other stock discovery
              applications. This is because currently, BlastOff leverages the
              IEX API to deliver real time information on the stocks supported,
              which is a subset of all trades in the stock market. This
              information is still highly accurate, but as a disclaimer, perform
              second checks on all data before making trade decisions!
            </Text>
          </View>
        </Collapsible>
        <View style={styles.divider} />

        <View style={styles.header}>
          <Pressable onPressIn={() => toggleLiveUpdateCollapsed()}>
            <Text style={styles.title}>
              Does Data Update Live Without Refreshing?
            </Text>
          </Pressable>
          <View style={styles.iconContainer}>
            <Ionicons
              name={
                liveUpdateCollapsed
                  ? 'chevron-down-circle-outline'
                  : 'chevron-up-circle-outline'
              }
              size={20}
              color="white"
            />
          </View>
        </View>
        <Collapsible collapsed={liveUpdateCollapsed}>
          <View style={styles.headerBody}>
            <Text style={styles.body}>
              Yes, BlastOff supports auto-refresh, real-time live data updates,
              as long as you remain connected over WiFi, and on a company page.
            </Text>
            <Text style={styles.body}>
              Data is updated every MINUTE on company pages that you search for,
              and every FIVE minutes on company pages generated by the stock
              picker.
            </Text>
            <Text style={styles.body}>
              Data is also refreshed each time you leave and re-enter a page;
              however, IEX does only supply data once a minute for intraday
              data, so that's the true hard cap on fresh data. We are looking to
              add real-time live quote updates once securing further support.
            </Text>
          </View>
        </Collapsible>
        <View style={styles.divider} />
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
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Dosis-Bold',
    fontSize: 20,
    color: 'white',
  },
  iconContainer: {
    justifyContent: 'center',
  },
  headerBody: {
    marginHorizontal: '1%',
  },
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  body: {
    fontSize: 15,
    color: 'silver',
    alignSelf: 'center',
    fontFamily: 'Dosis-Medium',
    marginBottom: '2%',
  },
  numberedItem: {
    fontSize: 15,
    color: 'silver',
    fontStyle: 'italic',
    fontFamily: 'Dosis-Medium',
  },
  bodyLink: {
    fontSize: 15,
    color: 'lightblue',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Dosis-Medium',
  },
});
