import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Text} from 'react-native';

// This is the display used in RandomStockScreen. Should be a 'lightweight' version of the main stock page for the stock.
export default function PartialCompanyDisplay(props) {
  console.log('PartialCompanyDisplay() Rendering...');

  const cloud_api_key = 'pk_765c2f02d9af4fd28f01fea090e2f544';
  const sandbox_api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a';
  const companySymbol = props.companySymbol;
  const [companyName, setCompanyName] = useState('');

  const fetchCompanyInfo = async (api_key, compSymbol) => {
    const companyInfoURL = `https://sandbox.iexapis.com/stable/stock/${compSymbol}/company?token=${sandbox_api_key}`;
    console.log(companyInfoURL);
    let companyInfo = [];

    await fetch(companyInfoURL)
      .then((response) => response.json())
      .then((responseJson) => {
        companyInfo = responseJson;
        setCompanyName(companyInfo.companyName);
      })
      .then(() => {
        console.log('COMPANY INFO:');
        console.log(companyInfo);
      });
  };

  useEffect(() => {
    fetchCompanyInfo(sandbox_api_key, companySymbol);
  }, [props.companySymbol]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{props.companySymbol} : {companyName}</Text>
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
    backgroundColor: 'black',
  },
});
