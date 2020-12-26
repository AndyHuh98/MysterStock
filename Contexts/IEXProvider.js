import React from 'react';
import {useState, useEffect, useMemo} from 'react';
import IEXContext from './IEXContext';

// TODO: https://stackoverflow.com/questions/56193207/react-native-how-can-i-update-state-in-context-api
// Add a set callback for the companySymbol and call fetchAdvStats when companySymbol is set in spin
export default function IEXProvider({children}) {
  const [stocksSupported, setStocksSupported] = useState(undefined);
  const [companySymbol, setCompanySymbol] = useState('');
  const [companyAdvStats, setCompanyAdvStats] = useState(undefined);
  const [companyName, setCompanyName] = useState(undefined);
  const [stocksSupportedFetched, setStocksSupportedFetched] = useState(false);

  // TODO: use these and pass them to all children, perhaps use Context Provider
  const cloud_api_key = 'pk_765c2f02d9af4fd28f01fea090e2f544';
  const sandbox_api_key = 'Tpk_77a598a1fa804de592413ba39f6b137a';

  const changeCompanySymbol = (compSymbol) => {
    setCompanySymbol(compSymbol);
  };

  async function fetchStocksSupported(api_key) {
    const iexStocksSupportedURL = `https://sandbox.iexapis.com/beta/ref-data/symbols?token=${api_key}`;
    console.log('IEXProvider() : ' + iexStocksSupportedURL);

    try {
      await fetch(iexStocksSupportedURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setStocksSupported(responseJson);
        });
    } catch (error) {
      console.error(error);
    }
  }

  const fetchCompanyAdvStats = async (api_key, compSymbol) => {
    const advStatsFetchURL = `https://sandbox.iexapis.com/stable/stock/${compSymbol}/advanced-stats?token=${api_key}`;
    console.log('IEXProvider(): ' + advStatsFetchURL);
    let advStats = [];

    await fetch(advStatsFetchURL)
      .then((response) => response.json())
      .then((responseJson) => {
        advStats = responseJson;
        setCompanyName(advStats.companyName);
        setCompanyAdvStats(advStats);
        setStocksSupportedFetched(true);
      });
  };

  async function parallelIEXFetch() {
    const fetchStocks = !stocksSupportedFetched
      ? fetchStocksSupported(sandbox_api_key)
      : null;
    const fetchAdvStats =
      companySymbol !== ''
        ? fetchCompanyAdvStats(sandbox_api_key, companySymbol)
        : null;

    // returns nothing, just a way to run the two functions in parallel
    return {
      supportedStocksSet: await fetchStocks,
      companyAdvStocksSet: await fetchAdvStats,
    };
  }

  useEffect(() => {
    parallelIEXFetch();
  }, [companySymbol]);

  return useMemo(() => {
    console.log('IEXProvider Rendering');
    return (
      <IEXContext.Provider
        value={{
          stocksSupported: stocksSupported,
          companySymbol: {companySymbol, changeCompanySymbol},
          advStats: companyAdvStats,
          companyName: companyName,
        }}>
        {children}
      </IEXContext.Provider>
    );
  }, [companySymbol, companyAdvStats, stocksSupported, children, companyName]);
}
