import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Keyboard} from 'react-native';

import auth from '@react-native-firebase/auth';

import {AppBackgroundColor} from '../Utils/Constants';
import CustomTextInput from '../CustomComponents/CustomTextInput';

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
        <Pressable
          style={styles.button}
          onPressIn={() => submitLoginInformation()}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPressIn={() => {
            props.navigation.navigate('Reset Password');
          }}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPressIn={() => props.navigation.navigate('Sign Up')}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
  loginFormContainer: {
    marginHorizontal: '5%',
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  title: {
    flex: 0.15,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: '2%',
  },
  infoInput: {
    alignSelf: 'center',
  },
  errorMessage: {
    flex: 0.075,
    marginLeft: '5%',
    marginTop: '-2%',
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
