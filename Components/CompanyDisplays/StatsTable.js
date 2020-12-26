import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import compactFormat from 'cldr-compact-number';
import {DataTable} from 'react-native-paper';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';

// TODO: Place N/A handlers in all entries of data table --> do this in LWStatsTable as well

// Props passed in: advStats
export default function StatsTable(props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleTableCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const dataTableDisplay = () => {
    return (
      <DataTable>
        <TouchableHighlight
          underlayColor="grey"
          activeOpacity={0.5}
          style={styles.touchableTest}
          onPress={() => toggleTableCollapsed()}>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={styles.statsTitle}>
                Stats:{' '}
                {isCollapsed ? '(Click to Show More)' : '(Click to Show Less)'}
              </Text>
            </DataTable.Title>
          </DataTable.Header>
        </TouchableHighlight>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Mkt Cap: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(props.advStats.marketcap, 'en', null, {
                  significantDigits: 3,
                  maximumFractionDigits: 4,
                })}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Employees: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.employees === null
                  ? ' N/A'
                  : props.advStats.employees}
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
                {parseFloat(props.advStats.week52low).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>52 Wk High: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(props.advStats.week52high).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Revenue: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(props.advStats.revenue, 'en', null, {
                  significantDigits: 3,
                  maximumFractionDigits: 4,
                })}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Rev. Per Share: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(props.advStats.revenuePerShare).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Gross Profit: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(props.advStats.grossProfit, 'en', null, {
                  significantDigits: 3,
                  maximumFractionDigits: 4,
                })}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Profit Margin: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(props.advStats.profitMargin).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Avg Vol: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(props.advStats.avg30Volume, 'en', null, {
                  significantDigits: 3,
                  maximumFractionDigits: 4,
                })}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Out. Shares: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(props.advStats.sharesOutstanding, 'en', null, {
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
              <Text style={styles.statsTitle}>Tot. Cash: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(props.advStats.totalCash, 'en', null, {
                  significantDigits: 3,
                  maximumFractionDigits: 4,
                })}{' '}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Current Debt: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(props.advStats.currentDebt, 'en', null, {
                  significantDigits: 3,
                  maximumFractionDigits: 4,
                })}{' '}
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
                {parseFloat(props.advStats.peRatio).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>EPS (TTM): </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(props.advStats.ttmEPS).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Fwd P/E Ratio: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(props.advStats.forwardPERatio).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>PEG Ratio:</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(props.advStats.pegRatio).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Put/Call Ratio: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(props.advStats.putCallRatio).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>EBITDA: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(props.advStats.EBITDA, 'en', null, {
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
              <Text style={styles.statsTitle}>Div/Yield: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.dividendYield == null
                  ? 'N/A'
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
                {props.advStats.nextDividendDate == null
                  ? 'N/A'
                  : props.advStats.nextDividendDate}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    );
  };

  return (
    <Collapsible
      style={styles.container}
      collapsed={isCollapsed}
      collapsedHeight={props.height}
      enablePointerEvents={true}>
      {dataTableDisplay()}
    </Collapsible>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    borderColor: 'yellow',
    borderWidth: 3,
  },
  statsTitle: {
    fontWeight: 'bold',
    color: 'black',
  },
  statsValue: {
    color: 'black',
  },
});
