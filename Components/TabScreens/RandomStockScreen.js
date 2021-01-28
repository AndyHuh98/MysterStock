import React, {useRef, useState, useEffect, useContext, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ReelGroup from '../Slots/ReelGroup';
import PartialCompanyDisplay from '../CompanyDisplays/PartialCompanyDisplay';
import IEXContext from '../../Contexts/IEXContext';
import {AppBackgroundColor} from '../Utils/Constants';

const screenWidth = Dimensions.get('screen').width * 0.96;

// props passed: navigation
export default function RandomStockScreen(props) {
  const [companyDisplayFadeAnim] = useState(new Animated.Value(0));
  const [companySymbol, setCompanySymbol] = useState('');
  const [stockBtnDisable, setStockBtnDisable] = useState(false);

  // TODO: Use this to ensure that animation finishes before launching application in the first view.
  const [animationFinished, setAnimationFinished] = useState(false);
  const iexContext = useContext(IEXContext);

  useEffect(() => {}, [iexContext.stocksSupported, companySymbol]);

  const reelGroup = useRef();

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
                style={styles.touchableOpacity}
                disabled={stockBtnDisable}
                onPress={(e) => newStockBtnClicked(e)}>
                <Text style={styles.titleBtnText}>
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
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
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
    alignSelf: 'center',
  },
  titleBtnText: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
    fontFamily: 'Dosis-Bold',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: `${AppBackgroundColor}`,
  },
  slotsContainer: {
    flex: 0.15,
    marginHorizontal: '2%',
    marginTop: '5%',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.1,
    marginTop: '1%',
    marginHorizontal: '10%',
    marginBottom: '5%',
    justifyContent: 'center',
    backgroundColor: '#0067da',
    borderRadius: 30,
  },
  companyDisplayContainer: {
    flex: 0.75,
    marginVertical: '2%',
  },
});
