import React from 'react';

import {View, SafeAreaView, Text, StyleSheet} from 'react-native'; 

export default function CompanyDisplay(props) {
  return(
      <SafeAreaView style={styles.container}>
          <Text>{props.companySymbol}</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    }
})