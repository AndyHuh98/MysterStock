import React, {useState, useEffect, useMemo} from 'react';
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
  const [companyPreviousDayData, setCompanyPreviousDayData] = useState(
    undefined,
  );
  // options: '1d-lw', '1d-reg', '5d', '1m', '3m', '1y', '5y'
  const [chartHistoryWindow, setChartHistoryWindow] = useState('1d');

  const changeCompanySymbol = (compSymbol) => {
    setCompanySymbol(compSymbol);
  };

  const changeChartHistoryWindow = (window) => {
    console.log('changing chart history window in IEXProvider to ' + window);
    setChartHistoryWindow(window);
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
    console.log('IEXProvider(): ' + companyIntradayURL);

    try {
      await fetch(companyIntradayURL)
        .then((response) => response.json())
        .then((responseJson) => {
          let filteredData = [];
          filteredData = responseJson.filter((dataPoint) => {
            let minutes = parseInt(dataPoint.minute.split(':')[1], 10);
            // can make graph more detailed by changing the modulo here
            return (
              (minutes % 4 === 0 || minutes % 5 === 0) &&
              dataPoint.average !== null
            );
          });
          setCompanyIntradayData(filteredData);
        });
    } catch (error) {
      console.error('ERROR: ' + error);
    }
  }

  async function fetchCompanyPreviousDayData(compSymbol) {
    const companyPreviousDayDataURL = `${api_base_url}/previous?symbol=${compSymbol}`;
    console.log('IEXProvider(): ' + companyPreviousDayDataURL);

    try {
      await fetch(companyPreviousDayDataURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setCompanyPreviousDayData(responseJson);
        });
    } catch (error) {
      console.error('ERROR: ' + error);
    }
  }

  // Each time the companySymbol changes, we need to load new advanced stats, companyInfo, and previous day data
  useEffect(() => {
    async function parallelCompDataFetch(compSymbol) {
      if (compSymbol !== '') {
        const fetchAdvStats = fetchCompanyAdvStats(compSymbol);
        const fetchInfo = fetchCompanyInfo(compSymbol);
        const fetchPreviousDayData = fetchCompanyPreviousDayData(compSymbol);

        return {
          advStatsSet: await fetchAdvStats,
          companyInfoSet: await fetchInfo,
          previousDayDataSet: await fetchPreviousDayData,
        };
      }
    }

    if (companySymbol !== '') {
      parallelCompDataFetch(companySymbol);
    }
  }, [companySymbol]);

  // Each time the chartHistoryWindow changes back to 1d, we want to refresh the fetch, we also want to refresh every 5 minutes for new intraday data
  // Also each time the company symbol changes we want new intraday data for the new company
  useEffect(() => {
    let intervalID = null;
    if (chartHistoryWindow === '1d' && companySymbol !== '') {
      fetchCompanyIntradayData(companySymbol);
      intervalID = setInterval(() => {
        console.log('setting timer for intraday data for ' + companySymbol);
        fetchCompanyIntradayData(companySymbol);
      }, 300000);
    }

    return () => {
      console.log('clearing interval set');
      clearInterval(intervalID);
    };
  }, [chartHistoryWindow, companySymbol]);

  // The first time we load into the app, we want to make sure the list of stocks is updated
  // TODO: put this in local storage and refresh only once every day (each time the app is booted up again)
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
          companyPreviousDayData: companyPreviousDayData,
          changeChartHistoryWindow: changeChartHistoryWindow,
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
    companyPreviousDayData,
    children,
  ]);
}
