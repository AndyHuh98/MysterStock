import React from 'react';
import {useEffect} from 'react';
import {useMemo} from 'react';
import {useState} from 'react';

import {View, StyleSheet, Button, Dimensions} from 'react-native';

import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';

import LightWeightIntradayStockChart from './LWIntradayStockChart';

const chartHeight = Dimensions.get('screen').height * 0.3;

// props passed: companySymbol, width, cloud_api_key, sandbox_api_key
export default function CompanyStockChart(props) {
  // 1d, 5d, 10d, 1m, 3m, 6m, 9m, 1y, 5y, 10y
  // roll out first: 1d, 5d, 1m, 3m, 1y, 5y
  // consider loading all historical data at once for seamless transitioning
  const [chartHistoryWindow, setChartHistoryWindow] = useState('1d');
  const [companyHistoricalData, setCompanyHistoricalData] = useState([]);

  function adjustHistoryWindow(newWindow) {
    console.log('adjusting history window to: ' + newWindow);
    setChartHistoryWindow(newWindow);
  }

  useEffect(() => {
    async function fetchNewHistoricalData(window) {
      console.log('fetchNewHistoricalData()');
      let modifiedWindow = window;
      if (window === '5d') {
        modifiedWindow = '5dm';
      }

      if (modifiedWindow !== '1d') {
        const historicalDataURL = `https://sandbox.iexapis.com/stable/stock/${props.companySymbol}/chart/${modifiedWindow}?token=${props.sandbox_api_key}`;
        console.log(
          'CompanyStockChart() - fetchNewHistoricalData(): ' +
            historicalDataURL,
        );

        try {
          await fetch(historicalDataURL)
            .then((response) => response.json())
            .then((responseJson) => {
              setCompanyHistoricalData(responseJson);
            });
        } catch (error) {
          console.error('ERROR: ' + error);
        }
      } else {
        setCompanyHistoricalData([]);
      }
    }

    fetchNewHistoricalData(chartHistoryWindow);
  }, [chartHistoryWindow, props.companySymbol, props.sandbox_api_key]);

  return useMemo(() => {
    const renderChart = () => {
      if (chartHistoryWindow === '1d') {
        return (
          <LightWeightIntradayStockChart
            companySymbol={props.companySymbol}
            width={props.width}
            api_key={props.cloud_api_key}
          />
        );
      } else {
        return renderHistoricalStockChart();
      }
    };

    // TODO: change Voronoi to horizontal line Robinhood type thing
    const renderHistoricalStockChart = () => {
      function getHistoricalData() {
        let earliestDateReturned = companyHistoricalData[0].date.split('-')[2];
        if (chartHistoryWindow === '5d') {
          let historicalData = companyHistoricalData.filter((dataPoint) => {
            return (
              parseInt(dataPoint.label.split(':')[1], 10) % 20 === 0 &&
              dataPoint.average !== null
            );
          });
          // map historical data into a label utilizing date and minute
          historicalData.map((dataPoint) => {
            let newLabel = dataPoint.date + ' ' + dataPoint.minute;
            dataPoint.label = newLabel;
          });
          return historicalData;
        } else {
          if (chartHistoryWindow === '5y') {
            let modulo = parseInt(earliestDateReturned, 10) % 4;
            return companyHistoricalData.filter((dataPoint) => {
              return (
                parseInt(dataPoint.date.split('-')[2], 10) % 4 === modulo &&
                dataPoint.high !== null
              );
            });
          } else if (chartHistoryWindow === '1y') {
            let modulo = parseInt(earliestDateReturned, 10) % 2;
            return companyHistoricalData.filter((dataPoint) => {
              return (
                parseInt(dataPoint.date.split('-')[2], 10) % 2 === modulo &&
                dataPoint.high !== null
              );
            });
          } else {
            return companyHistoricalData.filter((dataPoint) => {
              return dataPoint.high !== null;
            });
          }
        }
      }

      const getDomain = () => {
        if (chartHistoryWindow === '5d') {
          const averagePrices = companyHistoricalData
            .map((dataPoint) => dataPoint.average)
            .filter((average) => average != null);

          return [
            Math.min(...averagePrices) * 0.99,
            Math.max(...averagePrices) * 1.1,
          ];
        } else {
          const highPrices = companyHistoricalData
            .map((dataPoint) => dataPoint.high)
            .filter((high) => high != null);

          return [
            Math.min(...highPrices) * 0.99,
            Math.max(...highPrices) * 1.1,
          ];
        }
      };

      console.log(
        'CompanyStockChart(): rendering historical chart for: ' +
          chartHistoryWindow,
      );
      if (getHistoricalData().length > 1) {
        return (
          <View style={styles.chartContainer}>
            <VictoryChart
              theme={VictoryTheme.material}
              height={chartHeight}
              width={props.width}
              minDomain={{y: getDomain()[0]}}
              domain={
                companyHistoricalData.length > 0 ? null : {y: getDomain()}
              }
              containerComponent={
                <VictoryVoronoiContainer
                  labels={
                    chartHistoryWindow === '5d'
                      ? ({datum}) => `${datum.average} @ ${datum.label}`
                      : ({datum}) => `${datum.high} @ ${datum.date}`
                  }
                />
              }>
              <VictoryAxis fixLabelOverlap={true} tickFormat={(x) => ''} />
              <VictoryAxis dependentAxis />
              <VictoryLine
                data={getHistoricalData()}
                y={
                  chartHistoryWindow === '5d'
                    ? (datum) => datum.average
                    : (datum) => datum.high
                }
                x={
                  chartHistoryWindow === '5d'
                    ? (datum) => datum.label
                    : (datum) => datum.date
                }
                style={{
                  data: {stroke: '#c43a31'},
                  parent: {border: '1px solid #ccc'},
                }}
                labelComponent={<VictoryLabel text={''} />}
              />
            </VictoryChart>
          </View>
        );
      } else {
        return (
          <View style={styles.chartContainer}>
            <VictoryChart
              style={styles.chart}
              height={chartHeight}
              width={props.width}
              theme={VictoryTheme.material}>
              <VictoryAxis fixLabelOverlap={true} />
              <VictoryAxis dependentAxis />
              <VictoryLabel
                text="No data for company for given window."
                x={225}
                y={30}
                textAnchor="middle"
              />
            </VictoryChart>
          </View>
        );
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.chartContainer}>{renderChart()}</View>
        <View style={styles.historyButtonsContainer}>
          <Button
            onPress={() => adjustHistoryWindow('1d')}
            style={styles.historyWindowBtn}
            title="1d"
          />
          <Button
            onPress={() => adjustHistoryWindow('5d')}
            style={styles.historyWindowBtn}
            title="5d"
          />
          <Button
            onPress={() => adjustHistoryWindow('1m')}
            style={styles.historyWindowBtn}
            title="1m"
          />
          <Button
            onPress={() => adjustHistoryWindow('3m')}
            style={styles.historyWindowBtn}
            title="3m"
          />
          <Button
            onPress={() => adjustHistoryWindow('1y')}
            style={styles.historyWindowBtn}
            title="1y"
          />
          <Button
            onPress={() => adjustHistoryWindow('5y')}
            style={styles.historyWindowBtn}
            title="5y"
          />
        </View>
      </View>
    );
  }, [
    companyHistoricalData,
    props.cloud_api_key,
    props.companySymbol,
    props.width,
  ]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 3,
    flexDirection: 'column',
  },
  chartContainer: {
    backgroundColor: 'beige',
    flex: 0.7,
  },
  historyButtonsContainer: {
    backgroundColor: 'pink',
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  historyWindowBtn: {
    flex: 0.15,
  },
});
