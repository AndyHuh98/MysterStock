import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import compactFormat from 'cldr-compact-number';
import {DataTable} from 'react-native-paper';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';

// TODO: Place N/A handlers in all entries of data table --> do this in LWStatsTable as well

// Props passed in: advStats
export default function StatsTable(props) {
  const companyAdvStats = props.advStats;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleTableCollapsed = () => {
    console.log('clicked');
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
                {compactFormat(companyAdvStats.marketcap, 'en', null, {
                  significantDigits: 3,
                  maximumFractionDigits: 4,
                })}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Employees:</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {companyAdvStats.employees === null
                  ? ' N/A'
                  : compactFormat(companyAdvStats.employees, 'en', null, {
                      significantDigits: 3,
                      maximumFractionDigits: 2,
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
              <Text style={styles.statsTitle}>Revenue: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(companyAdvStats.revenue, 'en', null, {
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
                {parseFloat(companyAdvStats.revenuePerShare).toFixed(3)}
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
                {compactFormat(companyAdvStats.grossProfit, 'en', null, {
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
                {parseFloat(companyAdvStats.profitMargin).toFixed(3)}
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
                {compactFormat(companyAdvStats.avg30Volume, 'en', null, {
                  significantDigits: 3,
                  maximumFractionDigits: 4,
                })}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Out. Shares:</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(companyAdvStats.sharesOutstanding, 'en', null, {
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
                {compactFormat(companyAdvStats.totalCash, 'en', null, {
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
                {compactFormat(companyAdvStats.currentDebt, 'en', null, {
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

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Fwd P/E Ratio: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(companyAdvStats.forwardPERatio).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>PEG Ratio:</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {parseFloat(companyAdvStats.pegRatio).toFixed(3)}
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
                {parseFloat(companyAdvStats.putCallRatio).toFixed(3)}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>EBITDA: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {compactFormat(companyAdvStats.EBITDA, 'en', null, {
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
      </DataTable>
    );
  };

  // Change from ScrollView to <Collapsible> and see if it works.
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
