import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  SafeAreaView,
  Animated,
} from 'react-native';
import ReelGroup from '../Slots/ReelGroup';

// Implement SPIN Function using ReelGroup Spin within Functional Component
export default function RandomStockScreen(props) {
  const [companyDisplayFadeAnim] = useState(new Animated.Value(0));
  const [company, setCompany] = useState('');

  const reelGroup = useRef();

  const newStockBtnClicked = () => {
    fadeOutCompanyDisplay();
    reelGroup.current.spin((_company) => {
      setCompany(_company);
      fadeInCompanyDisplay();
    });
  };

  const fadeInCompanyDisplay = () => {
    Animated.timing(companyDisplayFadeAnim, {
      toValue: 1,
      duration: 350,
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
        <Text style={styles.titleText}>{company}</Text>
      </Animated.View>
    );

    return display;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Myster Stock</Text>
      <View style={styles.slotsContainer}>
        <ReelGroup ref={reelGroup} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="New Stock" onPress={() => newStockBtnClicked()} />
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
    backgroundColor: 'blue',
    marginTop: '1%',
    marginHorizontal: '3%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  companyDisplayContainer: {
    flex: 0.6,
    backgroundColor: 'green',
    marginHorizontal: '3%',
    marginVertical: '2%',
  },
});
