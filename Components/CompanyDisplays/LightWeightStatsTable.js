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

  const companyAdvStats = props.advStats;

  const dataTableDisplay = () => {
    return (
      <DataTable style={{shadowColor: 'yellow'}}>
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
                {compactFormat(companyAdvStats.marketcap, 'en', null, {
                  significantDigits: 3,
                  maximumFractionDigits: 4,
                })}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Avg Vol: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(companyAdvStats.avg30Volume / 30, 'en', null, {
                  significantDigits: 3,
                  maximumFractionDigits: 4,
                })}
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
                {parseFloat(companyAdvStats.week52low).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>52 Wk High: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(companyAdvStats.week52high).toFixed(2)}
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
                {companyAdvStats.dividendYield == null
                  ? 'N/A'
                  : parseFloat(companyAdvStats.dividendYield).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Nxt Div: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {companyAdvStats.nextDividendDate == null
                  ? 'N/A'
                  : companyAdvStats.nextDividendDate}
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
                {parseFloat(companyAdvStats.peRatio).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>EPS (TTM): </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(companyAdvStats.ttmEPS).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    );
  };

  return <View>{dataTableDisplay()}</View>;
}
