import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import compactFormat from 'cldr-compact-number';
import {DataTable, Divider} from 'react-native-paper';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import {
  noDataStatTableString,
  dataTableCats,
  AppBackgroundColor,
  AppSecondaryColor,
} from '../Utils/Constants';

// Props passed in: advStats
export default function StatsTable(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleTableCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const dataTableDisplay = () => {
    return (
      <DataTable>
        <DataTable.Row style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.mktcap}</Text>
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
            <Text style={styles.statsTitle}>{dataTableCats.employees}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.employees === null
                  ? noDataStatTableString
                  : props.advStats.employees}
              </Text>
            </DataTable.Cell>
          </View>
        </DataTable.Row>

        <DataTable.Row style={styles.alternateRow}>
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

        <DataTable.Row style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.revenue}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.revenue !== null
                  ? compactFormat(props.advStats.revenue, 'en', null, {
                      significantDigits: 2,
                      maximumFractionDigits: 1,
                    })
                  : noDataStatTableString}{' '}
              </Text>
            </DataTable.Cell>
          </View>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>
              {dataTableCats.revenuePerShare}
            </Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.revenuePerShare !== null
                  ? parseFloat(props.advStats.revenuePerShare).toFixed(3)
                  : noDataStatTableString}
              </Text>
            </DataTable.Cell>
          </View>
        </DataTable.Row>

        <DataTable.Row style={styles.alternateRow}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.grossprofit}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.grossProfit !== null
                  ? compactFormat(props.advStats.grossProfit, 'en', null, {
                      significantDigits: 2,
                      maximumFractionDigits: 1,
                    })
                  : noDataStatTableString}{' '}
              </Text>
            </DataTable.Cell>
          </View>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.profitMargin}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.profitMargin !== null
                  ? parseFloat(props.advStats.profitMargin).toFixed(3)
                  : noDataStatTableString}
              </Text>
            </DataTable.Cell>
          </View>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.avg30Volume}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.avg30Volume !== null
                  ? compactFormat(props.advStats.avg30Volume, 'en', null, {
                      significantDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : noDataStatTableString}{' '}
              </Text>
            </DataTable.Cell>
          </View>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>
              {dataTableCats.sharesOutstanding}
            </Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.sharesOutstanding !== null
                  ? compactFormat(
                      props.advStats.sharesOutstanding,
                      'en',
                      null,
                      {
                        significantDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )
                  : noDataStatTableString}
              </Text>
            </DataTable.Cell>
          </View>
        </DataTable.Row>

        <DataTable.Row style={styles.alternateRow}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.totalCash}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.totalCash !== null
                  ? compactFormat(props.advStats.totalCash, 'en', null, {
                      significantDigits: 2,
                      maximumFractionDigits: 1,
                    })
                  : noDataStatTableString}{' '}
              </Text>
            </DataTable.Cell>
          </View>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.currentDebt}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.currentDebt !== null
                  ? compactFormat(props.advStats.currentDebt, 'en', null, {
                      significantDigits: 2,
                      maximumFractionDigits: 1,
                    })
                  : noDataStatTableString}
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

        <DataTable.Row style={styles.alternateRow}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>
              {dataTableCats.forwardPERatio}
            </Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.forwardPERatio !== null
                  ? parseFloat(props.advStats.forwardPERatio).toFixed(2)
                  : noDataStatTableString}{' '}
              </Text>
            </DataTable.Cell>
          </View>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.pegRatio}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.pegRatio !== null
                  ? parseFloat(props.advStats.pegRatio).toFixed(3)
                  : noDataStatTableString}
              </Text>
            </DataTable.Cell>
          </View>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.putCallRatio}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.putCallRatio !== null
                  ? parseFloat(props.advStats.putCallRatio).toFixed(3)
                  : noDataStatTableString}{' '}
              </Text>
            </DataTable.Cell>
          </View>
          <View style={styles.cell}>
            <Text style={styles.statsTitle}>{dataTableCats.ebitda}</Text>
            <DataTable.Cell numeric>
              <Text style={styles.statsValue}>
                {props.advStats.ebitda !== null
                  ? compactFormat(props.advStats.ebitda, 'en', null, {
                      significantDigits: 2,
                      maximumFractionDigits: 2,
                    })
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
      </DataTable>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor="grey"
        activeOpacity={0.5}
        style={styles.collapseBtn}
        onPress={() => toggleTableCollapsed()}>
        <Text style={styles.statsHeader}>
          Stats: {isCollapsed ? '(Click to Show)' : '(Click to Hide)'}
        </Text>
      </TouchableHighlight>
      <Divider />
      <Collapsible collapsed={isCollapsed} enablePointerEvents={true}>
        {dataTableDisplay()}
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: `${AppBackgroundColor}`,
    borderRadius: 10,
  },
  collapseBtn: {
    height: 30,
    justifyContent: 'center',
    backgroundColor: `${AppSecondaryColor}`,
    borderRadius: 10,
  },
  statsHeader: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'Dosis-Bold',
  },
  statsTitle: {
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Dosis-Bold',
  },
  statsValue: {
    color: 'white',
    alignSelf: 'flex-end',
    fontFamily: 'Dosis-Medium',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  alternateRow: {
    flex: 1,
    backgroundColor: `${AppSecondaryColor}`,
    flexDirection: 'row',
    borderRadius: 10,
  },
  cell: {
    flex: 0.5,
    flexDirection: 'row',
  },
});
