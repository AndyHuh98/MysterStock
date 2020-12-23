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

export const HARDCODED_COMPANY_SYMBOLS_ARRAY = [
  'AAPL',
  'TSLA',
  'IBM',
  'MSFT',
  'NET',
  'GE',
  'BA',
  'AMZN',
  'GOOGL',
  'FSLY',
  'PLTR',
];
