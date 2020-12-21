import {Dimensions} from 'react-native';

const Constants = {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  REEL_COUNT: 4,
  SYMBOLS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ',
  SYMBOLS_ON_REEL: 3,
  REELS_REPEAT: 10,
};

export default Constants;
