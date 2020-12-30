import React, {useContext, useMemo} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import IEXContext from '../../Contexts/IEXContext';

const chartHeight = Dimensions.get('screen').height * 0.3;

// TODO: Display live latest price (last data point in intraday, or use quotes endpoint)
// TODO: Test LIVE UPDATE of this chart
// TODO: See what Robinhood behavior is for live update of weekly / monthly data

// Lightweight, single day stock price chart meant for the main page display.
// Props passed: width
export default function LightWeightIntradayStockChart(props) {
  const iexContext = useContext(IEXContext);

  return useMemo(() => {
    console.log('rendering new intradaydata');

    const chartDisplay = () => {
      const getDomain = () => {
        const averagePrices = iexContext.companyIntradayData
          .map((dataPoint) => dataPoint.average)
          .filter((average) => average != null);

        if (iexContext.companyPreviousDayData.fClose !== null) {
          const previousDayClose = iexContext.companyPreviousDayData.fClose;
          const minimum = Math.min(
            previousDayClose,
            Math.min(...averagePrices),
          );
          const maximum = Math.max(
            previousDayClose,
            Math.max(...averagePrices),
          );
          const paddedMinimum =
            minimum * (0.995 - (maximum - minimum) / minimum);
          const paddedMaximum =
            maximum * (1.005 + (maximum - minimum) / maximum);

          return [paddedMinimum, paddedMaximum];
        } else {
          return [
            Math.min(...averagePrices) * 0.95,
            Math.max(...averagePrices) * 1.05,
          ];
        }
      };

      if (iexContext.companyIntradayData !== undefined) {
        if (
          iexContext.companyIntradayData.filter(
            (dataPoint) => dataPoint.average !== null,
          ).length > 1
        ) {
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
                  <VictoryVoronoiContainer
                    labels={({datum}) => `$${datum.average} @ ${datum.minute}`}
                    voronoiBlacklist={['previousDayClose']}
                  />
                }>
                <VictoryAxis fixLabelOverlap={true} />
                <VictoryAxis dependentAxis />
                <VictoryLine
                  data={iexContext.companyIntradayData.filter(
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
                <VictoryLine
                  name="previousDayClose"
                  y={() => iexContext.companyPreviousDayData.fClose}
                  style={{
                    data: {
                      strokeDasharray: '5',
                      strokeWidth: 0.75,
                      fillOpacity: 0.4,
                    },
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
                <VictoryAxis fixLabelOverlap={true} />
                <VictoryAxis dependentAxis />
                <VictoryLabel
                  text="No intraday data for company."
                  x={225}
                  y={30}
                  textAnchor="middle"
                />
              </VictoryChart>
            </View>
          );
        }
      }
    };

    return <View style={styles.chartContainer}>{chartDisplay()}</View>;
  }, [
    iexContext.companyIntradayData,
    iexContext.companyPreviousDayData,
    props.width,
  ]);
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
  },
  priceText: {
    fontWeight: 'bold',
    marginLeft: '5%',
  },
});
