import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, StyleSheet} from 'react-native';
import Constants from '../Utils/Constants';

// pass in placeholder, secureTextEntry and onChangeText, inputTextColor
export default function CustomTextInput(props) {
  const styles = StyleSheet.create({
    textInput: {
      color: props.inputTextColor,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'grey',
      textAlign: 'center',
      height: props.height,
      width: props.width,
      fontFamily: 'Dosis-Medium',
    },
  });

  return (
    <TextInput
      style={[styles.textInput, props.style]}
      placeholder={props.placeholder}
      placeholderTextColor="silver"
      autoCorrect={false}
      secureTextEntry={props.secureTextEntry}
      onChangeText={props.onChangeText}
      autoCapitalize={props.autoCapitalize}
      height={props.height}
      width={props.width}
    />
  );
}

CustomTextInput.propTypes = {
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  inputTextColor: PropTypes.string,
  placeholder: PropTypes.string,
  autoCapitalize: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

CustomTextInput.defaultProps = {
  secureTextEntry: false,
  placeholder: 'Placeholder',
  onChangeText: null,
  inputTextColor: 'white',
  autoCapitalize: 'none',
  height: Constants.MAX_HEIGHT * 0.075,
  width: Constants.MAX_WIDTH * 0.75,
};
