import React from 'react';

import {Text, StyleSheet, View} from 'react-native';
import compactFormat from 'cldr-compact-number';
import {DataTable} from 'react-native-paper';

// Lightweight stats table with only 8 advanced stats, more like a preview for main stock page.
// Props passed: advStats
export default function LightWeightCompanyStatsTable(props) {
  const styles = StyleSheet.create({
    statsTitle: {
      fontWeight: 'bold',
      color: 'white',
    },
    statsValue: {
      color: 'white',
    },
  });

  const dataTableDisplay = () => {
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <Text style={styles.statsTitle}>Stats</Text>
          </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Mkt Cap: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.marketcap !== null
                  ? compactFormat(props.advStats.marketcap, 'en', null, {
                      significantDigits: 3,
                      maximumFractionDigits: 4,
                    })
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Avg Vol: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.avg30Volume !== null
                  ? compactFormat(props.advStats.avg30Volume, 'en', null, {
                      significantDigits: 3,
                      maximumFractionDigits: 4,
                    })
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>52 Wk Low: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.week52low !== null
                  ? parseFloat(props.advStats.week52low).toFixed(2)
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>52 Wk High: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.week52high !== null
                  ? parseFloat(props.advStats.week52high).toFixed(2)
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Div/Yield: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.dividendYield == null
                  ? 'No Data'
                  : parseFloat(props.advStats.dividendYield).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Nxt Div: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.nextDividendDate === null
                  ? 'No Data / None'
                  : props.advStats.nextDividendDate}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>P/E Ratio: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.peRatio !== null
                  ? parseFloat(props.advStats.peRatio).toFixed(2)
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>EPS (TTM): </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.ttmEPS !== null
                  ? parseFloat(props.advStats.ttmEPS).toFixed(3)
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    );
  };

  return <View>{dataTableDisplay()}</View>;
}
