import React, {useEffect, useMemo, useState} from 'react';

import {View, StyleSheet, Button, Dimensions} from 'react-native';

import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryCursorContainer,
  VictoryScatter,
} from 'victory-native';
import {api_base_url} from '../Utils/Constants';

const chartHeight = Dimensions.get('screen').height * 0.3;
// TODO: ParallaxScrollView: https://github.com/i6mi6/react-native-parallax-scroll-view

// props passed: companySymbol, width, companyPreviousDayData, companyIntradayData
export default function CompanyStockChartFromSearch(props) {
  const [chartHistoryWindow, setChartHistoryWindow] = useState('1d');
  const [companyHistoricalData, setCompanyHistoricalData] = useState([]);
  const [activeData, setActiveData] = useState({
    minute: null,
    average: null,
    cursorValue: null,
  });

  // when companySymbol changes or the chart history window changes, we want to
  // refetch
  useEffect(() => {
    async function fetchNewHistoricalData(window) {
      if (window !== '1d') {
        const historicalDataURL =
          window === '5d'
            ? `${api_base_url}/5dhistoricaldata?symbol=${props.companySymbol}`
            : `${api_base_url}/historicaldata?window=${window}&symbol=${props.companySymbol}`;

        console.log('CompanyStockChartFromSearch(): ' + historicalDataURL);

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

  // rendering the charts
  return useMemo(() => {
    function adjustHistoryWindow(newWindow) {
      console.log('adjusting history window to: ' + newWindow);
      setChartHistoryWindow(newWindow);
    }

    const renderChart = () => {
      if (chartHistoryWindow === '1d') {
        return renderIntradayStockChart();
      } else {
        return renderHistoricalStockChart();
      }
    };

    const renderIntradayStockChart = () => {
      console.log('CompanyStockChartFromSearch(): rendering intraday chart');
      const getDomain = () => {
        const averagePrices = props.companyIntradayData
          .map((dataPoint) => dataPoint.average)
          .filter((average) => average != null);

        if (props.companyPreviousDayData.close !== null) {
          const previousDayClose = props.companyPreviousDayData.close;
          const minimum = Math.min(
            previousDayClose,
            Math.min(...averagePrices),
          );
          const maximum = Math.max(
            previousDayClose,
            Math.max(...averagePrices),
          );
          const paddedMinimum = minimum * 0.985;
          const paddedMaximum = maximum * 1.015;

          return [paddedMinimum, paddedMaximum];
        } else {
          return [
            Math.min(...averagePrices) * 0.975,
            Math.max(...averagePrices) * 1.025,
          ];
        }
      };

      if (props.companyIntradayData) {
        if (
          props.companyIntradayData.filter(
            (dataPoint) => dataPoint.average !== null,
          ).length > 1
        ) {
          const point = activeData ? (
            <VictoryScatter
              data={[{x: activeData.cursorValue, y: activeData.average}]}
              style={{data: {size: 100}}}
            />
          ) : null;
          return (
            <View style={styles.chartContainer}>
              <VictoryChart
                style={styles.chart}
                minDomain={{y: getDomain()[0]}}
                maxDomain={{y: getDomain()[1]}}
                height={chartHeight}
                width={props.width}
                theme={VictoryTheme.material}
                containerComponent={
                  <VictoryCursorContainer
                    cursorDimension="x"
                    cursorLabel={() =>
                      `${activeData.average} @ ${activeData.minute}`
                    }
                    cursorLabelOffset={{x: -60, y: -60}}
                    onCursorChange={(value) => {
                      const filteredData = props.companyIntradayData.filter(
                        (dataPoint) => dataPoint.average !== null,
                      );
                      const cursorValue =
                        value !== undefined && value !== null
                          ? Math.round(value)
                          : filteredData.length;
                      const dataPoint = filteredData[cursorValue - 1];
                      setActiveData({
                        minute: dataPoint.minute,
                        average: dataPoint.average,
                        cursorValue: cursorValue,
                      });
                    }}
                  />
                }>
                <VictoryAxis fixLabelOverlap={true} />
                <VictoryAxis dependentAxis />
                {point}
                <VictoryLine
                  data={props.companyIntradayData.filter(
                    (dataPoint) => dataPoint.average != null,
                  )}
                  y={(datum) => datum.average}
                  x={(datum) => datum.minute}
                  style={{
                    data: {stroke: '#c43a31'},
                    parent: {border: '1px solid #ccc'},
                  }}
                  labelComponent={<VictoryLabel text={''} />}
                />
                {props.companyPreviousDayData.close !== null ? (
                  <VictoryLine
                    name="previousDayClose"
                    y={() => props.companyPreviousDayData.close}
                    style={{
                      data: {
                        strokeDasharray: '5',
                        strokeWidth: 0.75,
                        fillOpacity: 0.4,
                      },
                    }}
                  />
                ) : null}
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
                  text="No intraday data for company."
                  x={props.width / 2}
                  y={30}
                  textAnchor="middle"
                />
              </VictoryChart>
            </View>
          );
        }
      }
    };

    const renderHistoricalStockChart = () => {
      console.log(
        'CompanyStockChartFromSearch(): rendering historical chart for: ' +
          chartHistoryWindow,
      );

      function getHistoricalData() {
        if (companyHistoricalData.length > 0) {
          let earliestDateReturned = companyHistoricalData[0].date.split(
            '-',
          )[2];
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
          } else if (chartHistoryWindow === '5y') {
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

      if (companyHistoricalData) {
        if (getHistoricalData().length > 1) {
          return (
            <View style={styles.chartContainer}>
              <VictoryChart
                theme={VictoryTheme.material}
                height={chartHeight}
                width={props.width}
                minDomain={{y: getRange()[0]}}
                domain={
                  companyHistoricalData.length > 0 ? null : {y: getRange()}
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
                  x={props.width / 2}
                  y={30}
                  textAnchor="middle"
                />
              </VictoryChart>
            </View>
          );
        }
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
    activeData,
    companyHistoricalData,
    props.companyIntradayData,
    props.companyPreviousDayData,
    props.width,
  ]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 3,
    borderRadius: 10,
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
