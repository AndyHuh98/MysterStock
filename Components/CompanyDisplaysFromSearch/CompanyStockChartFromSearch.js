/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';

import {View, StyleSheet, Pressable, Text, Dimensions} from 'react-native';

import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryCursorContainer,
  VictoryScatter,
  LineSegment,
} from 'victory-native';
import {
  api_base_url,
  AppBackgroundColor,
  AppSecondaryColor,
} from '../Utils/Constants';

const chartHeight = Dimensions.get('screen').height * 0.3;

// props passed: companySymbol, width, companyPreviousDayData, companyIntradayData
export default function CompanyStockChartFromSearch(props) {
  const [chartHistoryWindow, setChartHistoryWindow] = useState('1d');
  const [companyHistoricalData, setCompanyHistoricalData] = useState([]);
  const [activeData, setActiveData] = useState({
    minute: null,
    average: null,
    cursorValue: null,
  });
  const [activeData5d, setActiveData5d] = useState({
    date: null,
    time: null,
    average: null,
  });
  const [activeData1m, setActiveData1m] = useState({
    date: null,
    high: null,
  });
  const [activeData3m, setActiveData3m] = useState({
    date: null,
    high: null,
  });
  const [activeData1y, setActiveData1y] = useState({
    date: null,
    high: null,
  });
  const [activeData5y, setActiveData5y] = useState({
    date: null,
    high: null,
  });

  useEffect(() => {
    setActiveData(null);
    setActiveData1m(null);
    setActiveData1y(null);
    setActiveData3m(null);
    setActiveData5d(null);
    setActiveData5y(null);
  }, [props.companySymbol]);

  // when companyIntradayData changes, update activeData to the latest value
  useEffect(() => {
    if (props.companyIntradayData) {
      const lastDataPoint =
        props.companyIntradayData[props.companyIntradayData.length - 1];
      if (lastDataPoint && lastDataPoint.minute && lastDataPoint.average) {
        setActiveData({
          minute: lastDataPoint.minute,
          average: lastDataPoint.average,
          cursorValue: props.companyIntradayData.length,
        });
      }
    }
  }, [props.companyIntradayData]);

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
    const setAnActiveData = (data) => {
      switch (chartHistoryWindow) {
        case '5d':
          setActiveData5d({
            date: data.date,
            time: data.label,
            average: data.average,
          });
          break;
        case '1m':
          setActiveData1m({
            date: data.date,
            time: data.label,
            high: data.high,
          });
          break;
        case '3m':
          setActiveData3m({
            date: data.date,
            time: data.label,
            high: data.high,
          });
          break;
        case '1y':
          setActiveData1y({
            date: data.date,
            time: data.label,
            high: data.high,
          });
          break;
        case '5y':
          setActiveData5y({
            date: data.date,
            time: data.label,
            high: data.high,
          });
          break;
      }
    };

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
        const averagePrices = props.companyIntradayData.map(
          (dataPoint) => dataPoint.average,
        );

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
        if (props.companyIntradayData.length > 1) {
          const point = activeData ? (
            <VictoryScatter
              data={[{x: activeData.cursorValue, y: activeData.average}]}
              style={{data: {size: 100, fill: '#0067da'}}}
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
                    cursorComponent={
                      <LineSegment style={{stroke: 'white', width: '5px'}} />
                    }
                    onCursorChange={(value) => {
                      const filteredData = props.companyIntradayData;
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
                <VictoryAxis
                  fixLabelOverlap={true}
                  style={{grid: {stroke: 'none'}}}
                  tickFormat={() => ''}
                />
                <VictoryAxis dependentAxis style={{grid: {stroke: 'none'}}} />
                {point}
                <VictoryLine
                  data={props.companyIntradayData}
                  y={(datum) => datum.average}
                  x={(datum) => datum.minute}
                  style={{
                    data: {stroke: '#0067da'},
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
                <VictoryLabel
                  inline
                  text={
                    activeData && activeData.average
                      ? `$${activeData.average.toFixed(2)} at ${
                          activeData.minute
                        }`
                      : null
                  }
                  x={100}
                  y={10}
                  textAnchor="middle"
                  backgroundPadding={10}
                  style={{
                    fill: 'white',
                    fontFamily: 'Dosis-Bold',
                    fontSize: 30,
                  }}
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
                <VictoryAxis
                  fixLabelOverlap={true}
                  style={{grid: {stroke: 'none'}}}
                  tickFormat={() => ''}
                />
                <VictoryAxis
                  dependentAxis
                  style={{grid: {stroke: 'none'}}}
                  tickFormat={() => ''}
                />
                <VictoryLabel
                  text="No intraday data for company."
                  x={props.width / 2}
                  y={100}
                  textAnchor="middle"
                  backgroundPadding={10}
                  backgroundStyle={{fill: 'white'}}
                />
              </VictoryChart>
            </View>
          );
        }
      }
    };

    // TODO: Split up 5d, 1m, 3m, 1y and 5y charts into individual components,
    // Make sure code is a lot more readable here because it's TOUGH figuring out
    // what goes what and I wrote it myself.
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
                  <VictoryCursorContainer
                    cursorDimension="x"
                    cursorComponent={
                      <LineSegment style={{stroke: 'white', width: '5px'}} />
                    }
                    onCursorChange={(value) => {
                      const filteredData = getHistoricalData();
                      const cursorValue =
                        value !== undefined && value !== null
                          ? Math.round(value)
                          : filteredData.length;
                      const dataPoint = filteredData[cursorValue - 1];
                      setAnActiveData(dataPoint);
                    }}
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
                    data: {stroke: '#0067da'},
                    parent: {border: '1px solid #ccc'},
                  }}
                  labelComponent={<VictoryLabel text={''} />}
                />
                <VictoryLabel
                  inline
                  text={() => {
                    switch (chartHistoryWindow) {
                      case '5d':
                        if (activeData5d) {
                          const time = activeData5d.time;
                          return `$${activeData5d.average.toFixed(
                            2,
                          )} at ${time}`;
                        } else {
                          return '';
                        }
                      case '1m':
                        if (activeData1m) {
                          const date = activeData1m.date;
                          return `$${activeData1m.high.toFixed(2)} at ${date}`;
                        } else {
                          return '';
                        }
                      case '3m':
                        if (activeData3m) {
                          const date = activeData3m.date;
                          return `$${activeData3m.high.toFixed(2)} at ${date}`;
                        } else {
                          return '';
                        }
                      case '1y':
                        if (activeData1y) {
                          const date = activeData1y.date;
                          return `$${activeData1y.high.toFixed(2)} at ${date}`;
                        } else {
                          return '';
                        }
                      case '5y':
                        if (activeData5y) {
                          const date = activeData5y.date;
                          return `$${activeData5y.high.toFixed(2)} at ${date}`;
                        } else {
                          return '';
                        }
                    }
                  }}
                  x={100}
                  y={10}
                  textAnchor="middle"
                  backgroundPadding={10}
                  style={{
                    fill: 'white',
                    fontFamily: 'Dosis-Bold',
                    fontSize: 20,
                  }}
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
                <VictoryAxis
                  fixLabelOverlap={true}
                  style={{grid: {stroke: 'none'}}}
                  tickFormat={() => ''}
                />
                <VictoryAxis
                  dependentAxis
                  style={{grid: {stroke: 'none'}}}
                  tickFormat={() => ''}
                />
                <VictoryLabel
                  text="No data for company for given window."
                  x={props.width / 2}
                  y={100}
                  textAnchor="middle"
                  backgroundPadding={10}
                  backgroundStyle={{fill: 'white'}}
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
  }, [
    activeData,
    activeData1m,
    activeData1y,
    activeData3m,
    activeData5d,
    activeData5y,
    companyHistoricalData,
    props.companyIntradayData,
    props.companyPreviousDayData.close,
    props.width,
  ]);
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
    backgroundColor: '#0067da',
    flex: 0.15,
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Dosis-Bold',
  },
});
