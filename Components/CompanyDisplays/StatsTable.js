import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import compactFormat from 'cldr-compact-number';
import {DataTable} from 'react-native-paper';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';

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
              <Text style={styles.statsTitle}>Employees: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.employees === null
                  ? 'No Data'
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
              <Text style={styles.statsTitle}>Revenue: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.revenue !== null
                  ? compactFormat(props.advStats.revenue, 'en', null, {
                      significantDigits: 3,
                      maximumFractionDigits: 4,
                    })
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Rev. Per Share: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.revenuePerShare !== null
                  ? parseFloat(props.advStats.revenuePerShare).toFixed(3)
                  : 'No Data'}
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
                {props.advStats.grossProfit !== null
                  ? compactFormat(props.advStats.grossProfit, 'en', null, {
                      significantDigits: 3,
                      maximumFractionDigits: 4,
                    })
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Profit Margin: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.profitMargin !== null
                  ? parseFloat(props.advStats.profitMargin).toFixed(3)
                  : 'No Data'}
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
                {props.advStats.avg30Volume !== null
                  ? compactFormat(props.advStats.avg30Volume, 'en', null, {
                      significantDigits: 3,
                      maximumFractionDigits: 4,
                    })
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Out. Shares: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.sharesOutstanding !== null
                  ? compactFormat(
                      props.advStats.sharesOutstanding,
                      'en',
                      null,
                      {
                        significantDigits: 3,
                        maximumFractionDigits: 4,
                      },
                    )
                  : 'No Data'}
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
                {props.advStats.totalCash !== null
                  ? compactFormat(props.advStats.totalCash, 'en', null, {
                      significantDigits: 3,
                      maximumFractionDigits: 4,
                    })
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Current Debt: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.currentDebt !== null
                  ? compactFormat(props.advStats.currentDebt, 'en', null, {
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

        <DataTable.Row>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>Fwd P/E Ratio: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.forwardPERatio !== null
                  ? parseFloat(props.advStats.forwardPERatio).toFixed(3)
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>PEG Ratio:</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.pegRatio !== null
                  ? parseFloat(props.advStats.pegRatio).toFixed(3)
                  : 'No Data'}
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
                {props.advStats.putCallRatio !== null
                  ? parseFloat(props.advStats.putCallRatio).toFixed(3)
                  : 'No Data'}
              </Text>
            </DataTable.Cell>
          </DataTable.Cell>
          <DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsTitle}>EBITDA: </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.statsValue}>
                {props.advStats.EBITDA !== null
                  ? compactFormat(props.advStats.EBITDA, 'en', null, {
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
