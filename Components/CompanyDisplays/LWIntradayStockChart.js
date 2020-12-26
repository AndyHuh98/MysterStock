import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
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

// Lightweight, single day stock price chart meant for the main page display.
// Props passed: width, initialPageRender, companySymbol, api_key
export default function LightWeightIntradayStockChart(props) {
  const companySymbol = props.companySymbol;
  const api_key = props.api_key;
  const [companyIntradayData, setCompanyIntradayData] = useState([]);

  // <a href="https://www.freepik.com/vectors/gold">Gold vector created by vilmosvarga - www.freepik.com</a>

  const fetchCompanyIntradayData = async (key) => {
    const companyIntradayURL = `https://cloud.iexapis.com/stable/stock/${companySymbol}/intraday-prices?token=${key}&chartLast=390`;
    console.log(companyIntradayURL);

    try {
      await fetch(companyIntradayURL)
        .then((response) => response.json())
        .then((responseJson) => {
          setCompanyIntradayData(responseJson);
        });
    } catch (error) {
      console.error('ERROR: ' + error);
    }
  };

  useEffect(() => {
    if (!props.initialPageRender) {
      fetchCompanyIntradayData(api_key);
    }
  }, [props.companySymbol]);

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

    if (companyIntradayData.length > 0) {
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
                labels={({datum}) => `${datum.average} @ ${datum.minute}`}
              />
            }>
            <VictoryAxis fixLabelOverlap={true} />
            <VictoryAxis dependentAxis />
            <VictoryLine
              data={companyIntradayData.filter((dataPoint) => {
                let minutes = dataPoint.minute.split(':')[1];
                // can make graph more detailed by changing the modulo here
                return minutes % 5 === 0 && dataPoint.average !== null;
              })}
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
    }
  };

  return (
    <View style={styles.chartContainer}>
      <Text>{chartDisplay()}</Text>
    </View>
  );
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
