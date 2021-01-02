import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// props passed in: companyInfo
export default function CompanyDescriptionFromSearch(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Description</Text>
      <Text>
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
