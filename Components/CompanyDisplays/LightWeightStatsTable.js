import React from 'react';

import {Text, StyleSheet, View} from 'react-native';
import compactFormat from 'cldr-compact-number';
import {DataTable} from 'react-native-paper';
import {
  AppSecondaryColor,
  dataTableCats,
  noDataStatTableString,
} from '../Utils/Constants';

// TODO: Replace 52 Wk Low and High with high and low from quote / intraday array
// TODO: Design custom data table component

// Lightweight stats table with only 8 advanced stats, more like a preview for main stock page.
// Props passed: advStats
export default function LightWeightCompanyStatsTable(props) {
  const styles = StyleSheet.create({
    statsTitle: {
      fontWeight: 'bold',
      color: 'white',
      alignSelf: 'center',
    },
    statsValue: {
      color: 'white',
      alignSelf: 'flex-end',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
    },
    cell: {
      flex: 0.5,
      flexDirection: 'row',
    },
    alternateRow: {
      flex: 1,
      backgroundColor: `${AppSecondaryColor}`,
      flexDirection: 'row',
      marginHorizontal: '3%',
      borderRadius: 10,
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

        <DataTable.Row style={styles.alternateRow}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>MktCap: </Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.marketcap !== null
                  ? compactFormat(props.advStats.marketcap, 'en', null, {
                      significantDigits: 2,
                      maximumFractionDigits: 1,
                    })
                  : noDataStatTableString}{' '}
              </Text>
            </DataTable.Cell>
          </View>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.avg30Volume}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.avg30Volume !== null
                  ? compactFormat(props.advStats.avg30Volume, 'en', null, {
                      significantDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : noDataStatTableString}
              </Text>
            </DataTable.Cell>
          </View>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.week52low}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.week52low !== null
                  ? parseFloat(props.advStats.week52low).toFixed(2)
                  : noDataStatTableString}{' '}
              </Text>
            </DataTable.Cell>
          </View>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.week52high}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.week52high !== null
                  ? parseFloat(props.advStats.week52high).toFixed(2)
                  : noDataStatTableString}
              </Text>
            </DataTable.Cell>
          </View>
        </DataTable.Row>

        <DataTable.Row style={styles.alternateRow}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.dividendYield}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.dividendYield == null
                  ? noDataStatTableString
                  : parseFloat(props.advStats.dividendYield).toFixed(3)}{' '}
              </Text>
            </DataTable.Cell>
          </View>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>
              {dataTableCats.nextDividendDate}
            </Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.nextDividendDate === null
                  ? noDataStatTableString
                  : props.advStats.nextDividendDate}
              </Text>
            </DataTable.Cell>
          </View>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.peRatio}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.peRatio !== null
                  ? parseFloat(props.advStats.peRatio).toFixed(2)
                  : noDataStatTableString}{' '}
              </Text>
            </DataTable.Cell>
          </View>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.ttmEPS}</Text>

            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.ttmEPS !== null
                  ? parseFloat(props.advStats.ttmEPS).toFixed(2)
                  : noDataStatTableString}
              </Text>
            </DataTable.Cell>
          </View>
        </DataTable.Row>
      </DataTable>
    );
  };

  return <View>{dataTableDisplay()}</View>;
}
