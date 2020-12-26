import React, {useRef, useState, useEffect, useContext, useMemo} from 'react';
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
import IEXContext from '../../Contexts/IEXContext';

const screenWidth = Dimensions.get('screen').width * 0.96;

// props passed: navigation
export default function RandomStockScreen(props) {
  const [companyDisplayFadeAnim] = useState(new Animated.Value(0));
  const [companySymbol, setCompanySymbol] = useState('');
  const [stockBtnDisable, setStockBtnDisable] = useState(false);
  const iexContext = useContext(IEXContext);

  async function fetchAllIEXStocks() {
    try {
      if (iexContext.stocksSupported !== undefined) {
        await setAllIEXStocks(iexContext.stocksSupported);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {}, [iexContext.stocksSupported, companySymbol]);

  const reelGroup = useRef();

  // TODO: In one of these, place a LoadingScreen Component
  return useMemo(() => {
    // Methods to fade in and fade out animations
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

    // On press method for stock button
    const newStockBtnClicked = (event) => {
      fadeOutCompanyDisplay();

      event.preventDefault();
      setStockBtnDisable(true);

      setTimeout(() => setStockBtnDisable(false), 4000);

      reelGroup.current.spin((_companySymbol) => {
        setCompanySymbol(_companySymbol);
        iexContext.companySymbol.changeCompanySymbol(_companySymbol);
        fadeInCompanyDisplay();
      });
    };

    if (iexContext.stocksSupported !== undefined) {
      return (
        <View style={styles.container}>
          <ImageBackground source={images.background} style={styles.background}>
            <SafeAreaView style={styles.container}>
              {iexContext.stocksSupported.length > 0 ? (
                <View style={styles.slotsContainer}>
                  <ReelGroup
                    companySymbolsArray={iexContext.stocksSupported.map(
                      (stock) => stock.symbol,
                    )}
                    ref={reelGroup}
                  />
                </View>
              ) : null}
              {iexContext.stocksSupported.length > 0 ? (
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
            </SafeAreaView>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={images.background}
            style={styles.background}
          />
        </View>
      );
    }
  }, [
    iexContext.stocksSupported,
    iexContext.companySymbol,
    stockBtnDisable,
    companyDisplayFadeAnim,
    companySymbol,
    props.navigation,
  ]);
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
