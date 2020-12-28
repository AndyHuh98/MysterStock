import React from 'react';
import {useState, useEffect, useMemo} from 'react';
import IEXContext from './IEXContext';

export default function IEXProvider({children}) {
  const [stocksSupported, setStocksSupported] = useState(undefined);
  const [stocksSupportedFetched, setStocksSupportedFetched] = useState(false);
  const [companyName, setCompanyName] = useState(undefined);
  const [companySymbol, setCompanySymbol] = useState('');
  const [companyAdvStats, setCompanyAdvStats] = useState(undefined);
  const [companyIntradayData, setCompanyIntradayData] = useState(undefined);
  const [companyInfo, setCompanyInfo] = useState(undefined);

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

  async function fetchCompanyInfo(api_key, compSymbol) {
    const companyInfoFetchURL = `https://sandbox.iexapis.com/stable/stock/${compSymbol}/company?token=${api_key}`;
    console.log('IEXProvider(): ' + companyInfoFetchURL);

    try {
      await fetch(companyInfoFetchURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setCompanyInfo(responseJson);
        });
    } catch (error) {
      console.error('ERROR: ' + error);
    }
  }

  async function fetchCompanyAdvStats(api_key, compSymbol) {
    const advStatsFetchURL = `https://sandbox.iexapis.com/stable/stock/${compSymbol}/advanced-stats?token=${api_key}`;
    console.log('IEXProvider(): ' + advStatsFetchURL);
    let advStats = [];

    try {
      await fetch(advStatsFetchURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setStocksSupportedFetched(true);
          advStats = responseJson;
          setCompanyName(advStats.companyName);
          setCompanyAdvStats(advStats);
        });
    } catch (error) {
      console.error('ERROR: ' + error);
    }
  }

  async function fetchCompanyIntradayData(api_key, compSymbol) {
    const companyIntradayURL = `https://cloud.iexapis.com/stable/stock/${compSymbol}/intraday-prices?token=${api_key}&chartLast=390`;
    console.log(
      'IEXProvider() - fetchCompanyIntradayData(): ' + companyIntradayURL,
    );

    try {
      await fetch(companyIntradayURL)
        .then((response) => response.json())
        .then((responseJson) => {
          let filteredData = [];
          filteredData = responseJson;
          filteredData.filter((dataPoint) => {
            let minutes = dataPoint.minute.split(':')[1];
            // can make graph more detailed by changing the modulo here
            for (let i = 5; i > 0; i--) {
              if (minutes % i === 0 && dataPoint.average !== null) {
                return minutes % i === 0 && dataPoint.average !== null;
              }
            }
            return minutes % 5 === 0 && dataPoint.average !== null;
          });
          setCompanyIntradayData(filteredData);
        });
    } catch (error) {
      console.error('ERROR: ' + error);
    }
  }

  // Each time the companySymbol changes, we need to load new advanced stats.
  useEffect(() => {
    async function intradayAndAdvStatsFetch(
      cloud_key,
      sandbox_key,
      compSymbol,
    ) {
      if (compSymbol !== '') {
        const fetchIntradayData = fetchCompanyIntradayData(
          cloud_key,
          compSymbol,
        );
        const fetchAdvStats = fetchCompanyAdvStats(sandbox_key, compSymbol);
        const fetchInfo = fetchCompanyInfo(sandbox_api_key, compSymbol);

        return {
          intradayDataSet: await fetchIntradayData,
          advStatsSet: await fetchAdvStats,
          companyInfoSet: await fetchInfo,
        };
      }
    }

    if (companySymbol !== '') {
      intradayAndAdvStatsFetch(cloud_api_key, sandbox_api_key, companySymbol);
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
          companyName: companyName,
          companySymbol: {companySymbol, changeCompanySymbol},
          advStats: companyAdvStats,
          companyIntradayData: companyIntradayData,
          companyInfo: companyInfo,
        }}>
        {children}
      </IEXContext.Provider>
    );
  }, [
    companyName,
    companySymbol,
    companyAdvStats,
    stocksSupported,
    companyIntradayData,
    companyInfo,
    children,
  ]);
}
