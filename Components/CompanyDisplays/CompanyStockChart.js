import React, {useContext, useEffect, useMemo, useState} from 'react';

import {View, StyleSheet, Text, Dimensions, Pressable} from 'react-native';

import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import IEXContext from '../../Contexts/IEXContext';
import {
  api_base_url,
  AppBackgroundColor,
  AppSecondaryColor,
} from '../Utils/Constants';

import LightWeightIntradayStockChart from './LWIntradayStockChart';

const chartHeight = Dimensions.get('screen').height * 0.3;

// TODO: See if it's possible to move the chart out of the scroll view, or disable scrolling when gestures are on chart cursor

// TODO: Make horizontal line connect until actual data is served (if IPO / listed
// more recently than 5y, for example)

// TODO: play around filtering to the points for 5y and 1y
// TODO: add the cursor container to historical and 5d intraday charts

// TODO: for intraday and historical stock charts, play around with SVG styling:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute

// props passed: companySymbol, width
export default function CompanyStockChart(props) {
  const iexContext = useContext(IEXContext);
  // 1d, 5d, 10d, 1m, 3m, 6m, 9m, 1y, 5y, 10y
  // roll out first: 1d, 5d, 1m, 3m, 1y, 5y
  // consider loading all historical data at once for seamless transitioning
  const [chartHistoryWindow, setChartHistoryWindow] = useState('1d');
  const [companyHistoricalData, setCompanyHistoricalData] = useState([]);

  useEffect(() => {
    async function fetchNewHistoricalData(window) {
      if (window !== '1d') {
        const historicalDataURL =
          window === '5d'
            ? `${api_base_url}/5dhistoricaldata?symbol=${props.companySymbol}`
            : `${api_base_url}/historicaldata?window=${window}&symbol=${props.companySymbol}`;

        console.log('CompanyStockChart(): ' + historicalDataURL);

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
  }, [chartHistoryWindow, props.companySymbol]);

  return useMemo(() => {
    function adjustHistoryWindow(newWindow) {
      console.log('adjusting history window to: ' + newWindow);
      setChartHistoryWindow(newWindow);
      iexContext.changeChartHistoryWindow(newWindow);
    }

    const renderChart = () => {
      if (chartHistoryWindow === '1d') {
        return <LightWeightIntradayStockChart width={props.width} />;
      } else {
        return renderHistoricalStockChart();
      }
    };

    const renderHistoricalStockChart = () => {
      console.log(
        'CompanyStockChart(): rendering historical chart for: ' +
          chartHistoryWindow,
      );

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
            let modulo = parseInt(earliestDateReturned, 10) % 5;
            return companyHistoricalData.filter((dataPoint) => {
              return (
                parseInt(dataPoint.date.split('-')[2], 10) % 5 === modulo &&
                dataPoint.high !== null
              );
            });
          } else if (chartHistoryWindow === '1y') {
            let modulo = parseInt(earliestDateReturned, 10) % 3;
            return companyHistoricalData.filter((dataPoint) => {
              return (
                parseInt(dataPoint.date.split('-')[2], 10) % 3 === modulo &&
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

      const getRange = () => {
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

      if (getHistoricalData().length > 1) {
        return (
          <View style={styles.chartContainer}>
            <VictoryChart
              theme={VictoryTheme.material}
              height={chartHeight}
              width={props.width}
              minDomain={{y: getRange()[0]}}
              domain={companyHistoricalData.length > 0 ? null : {y: getRange()}}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={
                    chartHistoryWindow === '5d'
                      ? ({datum}) => `${datum.average} @ ${datum.label}`
                      : ({datum}) => `${datum.high} @ ${datum.date}`
                  }
                />
              }>
              <VictoryAxis
                fixLabelOverlap={true}
                tickFormat={(x) => ''}
                style={{grid: {stroke: 'none'}}}
              />
              <VictoryAxis dependentAxis style={{grid: {stroke: 'none'}}} />
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
                x={props.width / 2}
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
          <Pressable
            onPressIn={() => adjustHistoryWindow('1d')}
            style={
              chartHistoryWindow === '1d'
                ? styles.selectedWindowBtn
                : styles.historyWindowBtn
            }>
            <Text style={styles.btnText}>1D</Text>
          </Pressable>
          <Pressable
            onPress={() => adjustHistoryWindow('5d')}
            style={
              chartHistoryWindow === '5d'
                ? styles.selectedWindowBtn
                : styles.historyWindowBtn
            }>
            <Text style={styles.btnText}>5D</Text>
          </Pressable>
          <Pressable
            onPress={() => adjustHistoryWindow('1m')}
            style={
              chartHistoryWindow === '1m'
                ? styles.selectedWindowBtn
                : styles.historyWindowBtn
            }>
            <Text style={styles.btnText}>1M</Text>
          </Pressable>
          <Pressable
            onPress={() => adjustHistoryWindow('3m')}
            style={
              chartHistoryWindow === '3m'
                ? styles.selectedWindowBtn
                : styles.historyWindowBtn
            }>
            <Text style={styles.btnText}>3M</Text>
          </Pressable>
          <Pressable
            onPress={() => adjustHistoryWindow('1y')}
            style={
              chartHistoryWindow === '1y'
                ? styles.selectedWindowBtn
                : styles.historyWindowBtn
            }>
            <Text style={styles.btnText}>1Y</Text>
          </Pressable>
          <Pressable
            onPress={() => adjustHistoryWindow('5y')}
            style={
              chartHistoryWindow === '5y'
                ? styles.selectedWindowBtn
                : styles.historyWindowBtn
            }>
            <Text style={styles.btnText}>5Y</Text>
          </Pressable>
        </View>
      </View>
    );
  }, [companyHistoricalData, props.companySymbol, props.width, iexContext]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: `${AppBackgroundColor}`,
  },
  chartContainer: {
    flex: 0.7,
    backgroundColor: `${AppSecondaryColor}`,
    borderRadius: 20,
  },
  historyButtonsContainer: {
    marginTop: '2%',
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  historyWindowBtn: {
    backgroundColor: `${AppSecondaryColor}`,
    flex: 0.15,
    borderRadius: 20,
  },
  selectedWindowBtn: {
    backgroundColor: 'limegreen',
    flex: 0.15,
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
