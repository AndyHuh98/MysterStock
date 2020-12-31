import {Dimensions} from 'react-native';

const Constants = {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  REEL_COUNT: 4,
  SYMBOLS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ',
  PANELS_PER_REEL: 3,
  REELS_REPEAT: 1,
};

export default Constants;

export const api_base_url = 'http://3.140.106.13:8080/api';

export const noDataStatTableString = ' --- ';

export const dataTableCats = {
  mktcap: 'MktCap: ',
  employees: '# Emps: ',
  week52low: '52W Hi: ',
  week52high: '52W Lo: ',
  revenue: 'Revenue: ',
  revenuePerShare: 'Rev P/S: ',
  grossprofit: 'Profit: ',
  profitMargin: 'Margin: ',
  avg30Volume: 'Avg Vol: ',
  sharesOutstanding: 'Shr. Out: ',
  totalCash: 'Tot. Cash: ',
  currentDebt: 'Debt: ',
  peRatio: 'P/E: ',
  ttmEPS: 'EPS(TTM): ',
  forwardPERatio: 'Fwd P/E: ',
  pegRatio: 'PEG: ',
  putCallRatio: 'Put/Call: ',
  ebitda: 'EBITDA: ',
  dividendYield: 'Div Yld: ',
  nextDividendDate: 'Nxt Div: ',
};
