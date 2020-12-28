import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IEXContext from '../../Contexts/IEXContext';

export default function CompanyDescription(props) {
  const iexContext = useContext(IEXContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Description</Text>
      <Text>
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
    backgroundColor: 'white',
    borderWidth: 3,
    borderRadius: 10,
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
