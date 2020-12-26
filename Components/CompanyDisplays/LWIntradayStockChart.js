import React, {useEffect, useState} from 'react';
import {useMemo} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';

const chartHeight = Dimensions.get('screen').height * 0.3;

// TODO: Test LIVE UPDATE of this chart
// TODO: See what Robinhood behavior is for live update of weekly / monthly data
// TODO: Add horizontal line for market open price (grey dashed on robinhood)

// Lightweight, single day stock price chart meant for the main page display.
// Props passed: width, initialPageRender, companySymbol, api_key
export default function LightWeightIntradayStockChart(props) {
  const api_key = props.api_key;
  const [companyIntradayData, setCompanyIntradayData] = useState([]);

  useEffect(() => {
    const fetchCompanyIntradayData = async (key) => {
      const companyIntradayURL = `https://cloud.iexapis.com/stable/stock/${props.companySymbol}/intraday-prices?token=${key}&chartLast=390`;
      console.log(
        'LWIntradayStockChart - fetchCompanyIntradayData(): ' +
          companyIntradayURL,
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
    };

    fetchCompanyIntradayData(api_key);
  }, [api_key, props.companySymbol]);

  return useMemo(() => {
    const chartDisplay = () => {
      const getDomain = () => {
        const averagePrices = companyIntradayData
          .map((dataPoint) => dataPoint.average)
          .filter((average) => average != null);

        return [
          Math.min(...averagePrices) * 0.99,
          Math.max(...averagePrices) * 1.1,
        ];
      };

      if (
        companyIntradayData.filter((dataPoint) => dataPoint.average !== null)
          .length > 1
      ) {
        return (
          <View style={styles.chartContainer}>
            <VictoryChart
              style={styles.chart}
              minDomain={{y: getDomain()[0]}}
              height={chartHeight}
              width={props.width}
              theme={VictoryTheme.material}
              domain={companyIntradayData.length > 0 ? null : {y: getDomain()}}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({datum}) => `$${datum.average} @ ${datum.minute}`}
                />
              }>
              <VictoryAxis fixLabelOverlap={true} />
              <VictoryAxis dependentAxis />
              <VictoryLine
                data={companyIntradayData.filter(
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
    };

    return <View style={styles.chartContainer}>{chartDisplay()}</View>;
  }, [companyIntradayData, props.width]);
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
