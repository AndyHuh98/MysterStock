import React, {useState} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';

import auth from '@react-native-firebase/auth';

import {AppBackgroundColor} from '../Utils/Constants';
import CustomTextInput from '../CustomComponents/CustomTextInput';
import CustomPressable from '../CustomComponents/CustomPressable';

export default function LoginScreen(props) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const submitLoginInformation = async () => {
    Keyboard.dismiss();

    if (!email || !password) {
      setErrorMessage('Please input email and password');
    } else {
      // do login here
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          props.navigation.navigate('More');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              setErrorMessage('Invalid email address');
              break;
            case 'auth/user-not-found':
              setErrorMessage('No account w/ given email found.');
              break;
            case 'auth/wrong-password':
              setErrorMessage('Invalid password.');
              break;
            default:
              setErrorMessage('Login unsuccessful. Try again.');
              break;
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginFormContainer}>
        <Text style={styles.title}>Mission Credentials</Text>
        <CustomTextInput
          placeholder="Email"
          inputTextColor="white"
          secureTextEntry={false}
          onChangeText={(text) => setEmail(text)}
          style={styles.infoInput}
        />
        <CustomTextInput
          style={styles.infoInput}
          inputTextColor="white"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <CustomPressable
          style={styles.button}
          onPressIn={() => submitLoginInformation()}
          text="Login"
        />
        <CustomPressable
          style={styles.button}
          onPressIn={() => {
            props.navigation.navigate('Reset Password');
          }}
          text="Reset Password"
        />
        <CustomPressable
          style={styles.button}
          onPressIn={() => props.navigation.navigate('Sign Up')}
          text="Sign Up"
        />
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
  loginFormContainer: {
    marginHorizontal: '5%',
    flex: 0.8,
    flexDirection: 'column',
  },
  title: {
    flex: 0.25,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  infoInput: {
    alignSelf: 'center',
    marginVertical: '2%',
  },
  errorMessage: {
    flex: 0.15,
    marginLeft: '5%',
    marginTop: '-2%',
    color: '#cc0000',
    fontSize: 11,
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginBottom: '2%',
  },
  button: {
    alignSelf: 'center',
    marginVertical: '2%',
  },
});
