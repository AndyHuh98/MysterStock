import React from 'react';
import {useState, useEffect, useMemo} from 'react';
import {api_base_url} from '../Components/Utils/Constants';
import IEXContext from './IEXContext';

export default function IEXProvider({children}) {
  const [stocksSupported, setStocksSupported] = useState(undefined);
  const [stocksSupportedFetched, setStocksSupportedFetched] = useState(false);
  const [companyName, setCompanyName] = useState(undefined);
  const [companySymbol, setCompanySymbol] = useState('');
  const [companyAdvStats, setCompanyAdvStats] = useState(undefined);
  const [companyIntradayData, setCompanyIntradayData] = useState(undefined);
  const [companyInfo, setCompanyInfo] = useState(undefined);

  const changeCompanySymbol = (compSymbol) => {
    setCompanySymbol(compSymbol);
  };

  async function fetchStocksSupported() {
    const stocksSupportedURL = `${api_base_url}/stockssupported`;
    console.log('IEXProvider() : ' + stocksSupportedURL);

    try {
      await fetch(stocksSupportedURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setStocksSupported(responseJson);
        });
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCompanyInfo(compSymbol) {
    const companyInfoFetchURL = `${api_base_url}/company?symbol=${compSymbol}`;
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

  async function fetchCompanyAdvStats(compSymbol) {
    const advStatsFetchURL = `${api_base_url}/advstats?symbol=${compSymbol}`;
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

  async function fetchCompanyIntradayData(compSymbol) {
    const companyIntradayURL = `${api_base_url}/intradaydata?symbol=${compSymbol}`;
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
    async function intradayAndAdvStatsFetch(compSymbol) {
      if (compSymbol !== '') {
        const fetchIntradayData = fetchCompanyIntradayData(compSymbol);
        const fetchAdvStats = fetchCompanyAdvStats(compSymbol);
        const fetchInfo = fetchCompanyInfo(compSymbol);

        return {
          intradayDataSet: await fetchIntradayData,
          advStatsSet: await fetchAdvStats,
          companyInfoSet: await fetchInfo,
        };
      }
    }

    if (companySymbol !== '') {
      intradayAndAdvStatsFetch(companySymbol);
    }
  }, [companySymbol]);

  // The first time we load into the app, we want to make sure the list of stocks is updated
  useEffect(() => {
    if (!stocksSupportedFetched) {
      fetchStocksSupported();
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
