import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Alert, Keyboard} from 'react-native';

import auth from '@react-native-firebase/auth';

import {AppBackgroundColor, AppSecondaryColor} from '../Utils/Constants';
import CustomTextInput from '../CustomComponents/CustomTextInput';

export default function ResetPassword(props) {
  const [email, setEmail] = useState(undefined);
  const [emailErrorMessage, setEmailErrorMessage] = useState(undefined);

  const resetPassword = () => {
    setEmailErrorMessage(undefined);
    Keyboard.dismiss();

    if (!email) {
      setEmailErrorMessage('Provide an email.');
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Password Reset', `Email sent to ${email}`))
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          setEmailErrorMessage('Email provided is invalid.');
        }
        if (error.code === 'auth/user-not-found') {
          setEmailErrorMessage('No account found matching email provided.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.changePasswordFormContainer}>
        <Text style={styles.title}>Reset Password</Text>
        <CustomTextInput
          style={styles.infoInput}
          inputTextColor="white"
          placeholder="Email"
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
        <Pressable style={styles.button} onPressIn={() => resetPassword()}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
    justifyContent: 'center',
  },
  changePasswordFormContainer: {
    backgroundColor: `${AppSecondaryColor}`,
    marginVertical: '3%',
    marginHorizontal: '5%',
    flex: 0.6,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: '2%',
  },
  infoInput: {
    backgroundColor: `${AppSecondaryColor}`,
    alignSelf: 'center',
  },
  errorMessage: {
    flex: 0.075,
    marginLeft: '5%',
    marginTop: '-1%',
    color: '#cc0000',
    fontSize: 11,
    fontWeight: '400',
    alignSelf: 'flex-start',
  },
  button: {
    flex: 0.15,
    backgroundColor: '#0067da',
    marginHorizontal: '20%',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: '2%',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});
