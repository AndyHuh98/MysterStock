import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppSecondaryColor} from '../Utils/Constants';

// props passed in: companyInfo
export default function CompanyDescriptionFromSearch(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Description</Text>
      <Text style={styles.descriptionText}>
        {props.companyInfo.description === '0'
          ? 'Company description not supported.'
          : props.companyInfo.description}
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
