import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import ReelGroup from '../Slots/ReelGroup';
import PartialCompanyDisplay from '../CompanyDisplays/PartialCompanyDisplay';
import images from '../../assets/images';
import {useMemo} from 'react';

const screenWidth = Dimensions.get('screen').width * 0.96;

// props passed: navigation
export default function RandomStockScreen(props) {
  const [companyDisplayFadeAnim] = useState(new Animated.Value(0));
  const [companySymbol, setCompanySymbol] = useState('');
  const [stockBtnDisable, setStockBtnDisable] = useState(false);
  // TODO: pass to children through context provider instead of prop drilling
  const [allIEXStocks, setAllIEXStocks] = useState([]);

  // TODO: use these and pass them to all children, perhaps use Context Provider
  const cloud_api_key = 'pk_765c2f02d9af4fd28f01fea090e2f544';
  const sandbox_api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a';

  async function fetchAllIEXStocks() {
    const allIEXStocksURL = `https://sandbox.iexapis.com/beta/ref-data/symbols?token=${sandbox_api_key}`;
    console.log(allIEXStocksURL);

    let allIEXStox = [];
    try {
      await fetch(allIEXStocksURL)
        .then((response) => response.json())
        .then((responseJson) => {
          allIEXStox = responseJson;
          setAllIEXStocks(allIEXStox);
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllIEXStocks();
  }, []);

  const reelGroup = useRef();

  const newStockBtnClicked = (event) => {
    fadeOutCompanyDisplay();

    event.preventDefault();
    setStockBtnDisable(true);

    setTimeout(() => setStockBtnDisable(false), 5000);

    reelGroup.current.spin((_companySymbol) => {
      setCompanySymbol(_companySymbol);
      fadeInCompanyDisplay();
    });
  };

  const fadeInCompanyDisplay = () => {
    Animated.timing(companyDisplayFadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutCompanyDisplay = () => {
    Animated.timing(companyDisplayFadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const renderCompanyDisplay = () => {
    const display = (
      <Animated.View
        style={[
          styles.companyDisplayContainer,
          {opacity: companyDisplayFadeAnim},
        ]}>
        {companySymbol !== '' ? (
          <PartialCompanyDisplay
            navigation={props.navigation}
            width={screenWidth}
            companySymbol={companySymbol}
          />
        ) : null}
      </Animated.View>
    );

    return display;
  };

  // TODO: In one of these, place a LoadingScreen Component
  return (
    <View style={styles.container}>
      <ImageBackground source={images.background} style={styles.background}>
        <SafeAreaView style={styles.container}>
          {allIEXStocks.length > 0 ? (
            <View style={styles.slotsContainer}>
              <ReelGroup
                companySymbolsArray={allIEXStocks.map((stock) => stock.symbol)}
                ref={reelGroup}
              />
            </View>
          ) : null}
          {allIEXStocks.length > 0 ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={stockBtnDisable}
                onPress={(e) => newStockBtnClicked(e)}>
                <Text style={styles.titleText}>
                  {stockBtnDisable ? 'Please Wait...' : 'New Stock'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {renderCompanyDisplay()}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  slotsContainer: {
    flex: 0.15,
    marginHorizontal: '2%',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 10,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.1,
    backgroundColor: 'grey',
    marginTop: '1%',
    marginHorizontal: '3%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  companyDisplayContainer: {
    flex: 0.75,
    marginHorizontal: '3%',
    marginVertical: '2%',
  },
});
