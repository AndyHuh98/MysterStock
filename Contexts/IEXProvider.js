import React from 'react';
import {useState, useEffect, useMemo} from 'react';
import IEXContext from './IEXContext';

/* PARALLEL FETCHING - MAY COME IN HANDY - TODO: fetch historical data at the same time as advanced stats
async function parallelIEXFetch() {
  const fetchStocks = !stocksSupportedFetched
    ? fetchStocksSupported(sandbox_api_key)
    : null;
  const fetchAdvStats =
    companySymbol !== '' && !stocksSupportedFetched
      ? fetchCompanyAdvStats(sandbox_api_key, companySymbol)
      : null;

  // returns nothing, just a way to run the two functions in parallel
  return {
    supportedStocksSet: await fetchStocks,
    companyAdvStocksSet: await fetchAdvStats,
  };
  */

export default function IEXProvider({children}) {
  // TODO: Fetch intraday price at the same time as advanced stats to prevent
  // duplicate call to API --> navigating from partial display to full display with default of '1d'
  // leads to two calls, so we can just call once and pass it through since its default behavior
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
        setStocksSupportedFetched(true);
        advStats = responseJson;
        setCompanyName(advStats.companyName);
        setCompanyAdvStats(advStats);
      });
  };

  // Each time the companySymbol changes, we need to load new advanced stats.
  useEffect(() => {
    if (companySymbol !== '') {
      fetchCompanyAdvStats(sandbox_api_key, companySymbol);
    }
  }, [companySymbol]);

  // The first time we load into the app, we want to make sure the list of stocks is updated
  useEffect(() => {
    if (!stocksSupportedFetched) {
      fetchStocksSupported(sandbox_api_key);
    }
  }, [stocksSupportedFetched]);

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
