import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Reel from './Reel';

import Constants from '../Utils/Constants';

export default function ReelGroup(props) {
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);

  const onLayout = (e) => {
    setWidth(e.nativeEvent.layout.width);
    setHeight(e.nativeEvent.layout.height);
  };

  const renderReels = () => {
    const reelWidth = width / Constants.REEL_COUNT;
    const reelList = Array.apply(null, Array(Constants.REEL_COUNT)).map(
      (reel, index) => {
        return (
          <Reel width={reelWidth} height={height} key={index} index={index} />
        );
      },
    );

    return <>{reelList}</>;
  };

  return (
    <View style={styles.reelGroup} onLayout={onLayout}>
      {renderReels()}
    </View>
  );
}

const styles = StyleSheet.create({
  reelGroup: {
    flex: 1,
    backgroundColor: 'orange',
    flexDirection: 'row',
  },
});
