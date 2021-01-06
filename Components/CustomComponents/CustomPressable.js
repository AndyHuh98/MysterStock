import React from 'react';

import {Pressable, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import Constants from '../Utils/Constants';

// TODO: Extract all Pressables in forms into a single component with standardized styling.
// pass button text, onPressIn, and potentially styles, height, and width
export default function CustomPressable(props) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#0067da',
      borderRadius: 20,
      justifyContent: 'center',
      width: props.width,
      height: props.height,
    },
    buttonText: {
      alignSelf: 'center',
      color: 'white',
    },
  });

  return (
    <Pressable style={[styles.button, props.style]} onPressIn={props.onPressIn}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </Pressable>
  );
}

CustomPressable.propTypes = {
  text: PropTypes.string,
  onPressIn: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
};

CustomPressable.defaultProps = {
  text: 'Button',
  onPressIn: null,
  width: Constants.MAX_WIDTH * 0.55,
  height: Constants.MAX_HEIGHT * 0.065,
};
