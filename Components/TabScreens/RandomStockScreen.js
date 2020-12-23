import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import ReelGroup from '../Slots/ReelGroup';
import PartialCompanyDisplay from '../CompanyDisplays/PartialCompanyDisplay';

// Implement SPIN Function using ReelGroup Spin within Functional Component
export default function RandomStockScreen(props) {
  const [companyDisplayFadeAnim] = useState(new Animated.Value(0));
  const [companySymbol, setCompanySymbol] = useState('');
  const [stockBtnDisable, setStockBtnDisable] = useState(false);

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
        <PartialCompanyDisplay companySymbol={companySymbol} />
      </Animated.View>
    );

    return display;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.slotsContainer}>
        <ReelGroup ref={reelGroup} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={stockBtnDisable}
          onPress={(e) => newStockBtnClicked(e)}>
          <Text style={styles.titleText}>
            {stockBtnDisable ? 'Please Wait...' : 'New Stock'}
          </Text>
        </TouchableOpacity>
      </View>
      {renderCompanyDisplay()}
    </SafeAreaView>
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
    backgroundColor: 'white',
  },
  slotsContainer: {
    flex: 0.3,
    marginHorizontal: '2%',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 10,
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
    flex: 0.6,
    marginHorizontal: '3%',
    marginVertical: '2%',
  },
});
