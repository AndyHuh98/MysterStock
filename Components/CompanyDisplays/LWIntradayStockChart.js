/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useMemo, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
  VictoryAxis,
  VictoryLabel,
  VictoryCursorContainer,
} from 'victory-native';
import IEXContext from '../../Contexts/IEXContext';

const chartHeight = Dimensions.get('screen').height * 0.33;
// Lightweight, single day stock price chart meant for the main page display.
// Props passed: width
export default function LightWeightIntradayStockChart(props) {
  const iexContext = useContext(IEXContext);
  const [activeData, setActiveData] = useState({
    minute: null,
    average: null,
    cursorValue: null,
  });

  return useMemo(() => {
    const chartDisplay = () => {
      const getDomain = () => {
        const averagePrices = iexContext.companyIntradayData
          .map((dataPoint) => dataPoint.average)
          .filter((average) => average != null);

        if (iexContext.companyPreviousDayData.close !== null) {
          const previousDayClose = iexContext.companyPreviousDayData.close;
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

      if (iexContext.companyIntradayData !== undefined) {
        if (
          iexContext.companyIntradayData.filter(
            (dataPoint) => dataPoint.average !== null,
          ).length > 1
        ) {
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
                    cursorLabelComponent={
                      <VictoryLabel
                        backgroundPadding={10}
                        backgroundStyle={{fill: 'white'}}
                      />
                    }
                    cursorLabel={() =>
                      `${activeData.average} @ ${activeData.minute}`
                    }
                    cursorLabelOffset={{x: -60, y: -60}}
                    onCursorChange={(value) => {
                      const filteredData = iexContext.companyIntradayData.filter(
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
                <VictoryAxis
                  fixLabelOverlap={true}
                  style={{grid: {stroke: 'none'}}}
                />
                <VictoryAxis dependentAxis style={{grid: {stroke: 'none'}}} />
                {point}
                <VictoryLine
                  data={iexContext.companyIntradayData.filter(
                    (dataPoint) => dataPoint.average != null,
                  )}
                  y={(datum) => datum.average}
                  x={(datum) => datum.minute}
                  style={{
                    data: {stroke: '#0067da'},
                    parent: {border: '1px solid #ccc'},
                  }}
                  labelComponent={<VictoryLabel text={''} />}
                />
                {iexContext.companyPreviousDayData.close !== null ? (
                  <VictoryLine
                    name="previousDayClose"
                    y={() => iexContext.companyPreviousDayData.close}
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

    return <View style={styles.chartContainer}>{chartDisplay()}</View>;
  }, [
    activeData,
    iexContext.companyIntradayData,
    iexContext.companyPreviousDayData,
    props.width,
  ]);
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
