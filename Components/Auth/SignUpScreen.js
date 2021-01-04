import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import images from '../../assets/images';

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
      <ImageBackground
        source={images.background}
        style={styles.imageBackground}>
        <View style={styles.signupFormContainer}>
          <Text style={styles.title}>Mission Initiation</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Email</Text>
            <TextInput
              style={styles.infoInput}
              placeholder="Email"
              placeholderTextColor="silver"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
            <TextInput
              style={styles.infoInput}
              placeholder="Verify Email"
              placeholderTextColor="silver"
              autoCorrect={false}
              onChangeText={(text) => setVerifyEmail(text)}
            />
            <Text style={styles.errorMessage}>{verifyEmailErrorMessage}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Password</Text>
            <TextInput
              style={styles.infoInput}
              placeholder="Password"
              placeholderTextColor="silver"
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
            <TextInput
              style={styles.infoInput}
              placeholder="Verify Password"
              placeholderTextColor="silver"
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={(text) => setVerifyPassword(text)}
            />
            <Text style={styles.errorMessage}>
              {verifyPasswordErrorMessage}
            </Text>
          </View>
          <Pressable
            style={styles.button}
            onPressIn={() => submitSignUpInformation()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPressIn={() => props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  errorMessage: {
    flex: 0.15,
    marginLeft: '5%',
    marginTop: '-2%',
    color: '#cc0000',
    fontSize: 11,
    fontWeight: '400',
    alignSelf: 'flex-start',
  },
  signupFormContainer: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 10,
    margin: '5%',
    justifyContent: 'space-evenly',
  },
  fieldContainer: {
    marginVertical: '2%',
    marginHorizontal: '2%',
    flex: 0.3,
    flexDirection: 'column',
  },
  fieldTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  infoInput: {
    borderWidth: 3,
    flex: 0.4,
    textAlign: 'center',
    marginVertical: '2%',
  },
  button: {
    borderWidth: 3,
    flex: 0.1,
    backgroundColor: 'blue',
    marginHorizontal: '20%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});
