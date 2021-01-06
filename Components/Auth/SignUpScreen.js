import React, {useState} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';

import auth from '@react-native-firebase/auth';

import {AppBackgroundColor, AppSecondaryColor} from '../Utils/Constants';
import CustomTextInput from '../CustomComponents/CustomTextInput';
import CustomPressable from '../CustomComponents/CustomPressable';

export default function SignUpScreen(props) {
  const [email, setEmail] = useState(undefined);
  const [verifyEmail, setVerifyEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [verifyPassword, setVerifyPassword] = useState(undefined);

  const [emailErrorMessage, setEmailErrorMessage] = useState(undefined);
  const [verifyEmailErrorMessage, setVerifyEmailErrorMessage] = useState(
    undefined,
  );
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(undefined);
  const [verifyPasswordErrorMessage, setVerifyPasswordErrorMessage] = useState(
    undefined,
  );

  const submitSignUpInformation = async () => {
    Keyboard.dismiss();
    // clear all error messages upon pressing submit sign up
    setEmailErrorMessage(undefined);
    setVerifyEmailErrorMessage(undefined);
    setPasswordErrorMessage(undefined);
    setVerifyPasswordErrorMessage(undefined);

    // first verifications -- make sure values are not empty
    if (!email) {
      setEmailErrorMessage('Please input an email.');
    }

    if (!verifyEmail) {
      setVerifyEmailErrorMessage('Please input an email.');
    }

    if (!password) {
      setPasswordErrorMessage('Please input a password');
    }

    if (!verifyPassword) {
      setVerifyPasswordErrorMessage('Please input a password');
      return;
    }

    // second verifications -- make sure values match for the respective fields
    if (email !== verifyEmail) {
      setVerifyEmailErrorMessage('Value does not match email provided');
    }

    if (password !== verifyPassword) {
      setVerifyPasswordErrorMessage('Value does not match password provided');
      return;
    }

    // third verifications -- make sure password is the correct length
    if (password.length < 8) {
      setPasswordErrorMessage('Password must have a length of at least 8.');
    }

    if (verifyPassword.length < 8) {
      setVerifyPasswordErrorMessage(
        'Password must have a length of at least 8.',
      );
      return;
    }

    if (email === verifyEmail && password === verifyPassword) {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('created user');
          props.navigation.navigate('More');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            setEmailErrorMessage('Email address already in use');
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupFormContainer}>
        <Text style={styles.title}>Mission Initiation</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>Email</Text>
          <CustomTextInput
            style={styles.infoInput}
            placeholder="Email"
            inputTextColor="white"
            secureTextEntry={false}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
          <CustomTextInput
            style={styles.infoInput}
            placeholder="Verify Email"
            inputTextColor="white"
            secureTextEntry={false}
            onChangeText={(text) => setVerifyEmail(text)}
          />
          <Text style={styles.errorMessage}>{verifyEmailErrorMessage}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>Password</Text>
          <CustomTextInput
            style={styles.infoInput}
            inputTextColor="white"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
          <CustomTextInput
            style={styles.infoInput}
            inputTextColor="white"
            placeholder="Verify Password"
            secureTextEntry={true}
            onChangeText={(text) => setVerifyPassword(text)}
          />
          <Text style={styles.errorMessage}>{verifyPasswordErrorMessage}</Text>
        </View>
        <CustomPressable
          style={styles.button}
          onPressIn={() => submitSignUpInformation()}
          text="Sign Up"
        />
        <CustomPressable
          style={styles.button}
          onPressIn={() => props.navigation.navigate('Login')}
          text="Login"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  errorMessage: {
    flex: 0.2,
    marginLeft: '5%',
    marginTop: '-6%',
    color: '#cc0000',
    fontSize: 11,
    fontWeight: '400',
    alignSelf: 'flex-start',
  },
  signupFormContainer: {
    flex: 1,
    margin: '5%',
  },
  fieldContainer: {
    flex: 0.45,
    marginHorizontal: '2%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  fieldTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  infoInput: {
    backgroundColor: `${AppSecondaryColor}`,
    alignSelf: 'center',
    marginBottom: '4%',
  },
  button: {
    alignSelf: 'center',
    marginBottom: '3%',
  },
});
