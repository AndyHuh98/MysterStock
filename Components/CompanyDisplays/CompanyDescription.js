import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IEXContext from '../../Contexts/IEXContext';
import {AppSecondaryColor} from '../Utils/Constants';

export default function CompanyDescription(props) {
  const iexContext = useContext(IEXContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Description</Text>
      <Text style={styles.descriptionText}>
        {iexContext.companyInfo.description === '0'
          ? 'Company description not supported.'
          : iexContext.companyInfo.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppSecondaryColor}`,
    borderRadius: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  descriptionText: {
    color: 'white',
  },
});
