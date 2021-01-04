import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  Alert,
  Keyboard,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import images from '../../assets/images';

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
      <ImageBackground
        source={images.background}
        style={styles.imageBackground}>
        <View style={styles.changePasswordFormContainer}>
          <Text style={styles.title}>Reset Password</Text>
          <TextInput
            style={styles.infoInput}
            placeholder="Email"
            placeholderTextColor="silver"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
          <Pressable style={styles.button} onPressIn={() => resetPassword()}>
            <Text style={styles.buttonText}>Submit</Text>
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
  changePasswordFormContainer: {
    marginVertical: '3%',
    marginHorizontal: '5%',
    flex: 1,
    borderRadius: 10,
    borderWidth: 3,
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
    borderWidth: 3,
    flex: 0.1,
    marginBottom: '1%',
    marginHorizontal: '5%',
    textAlign: 'center',
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
    borderWidth: 3,
    flex: 0.1,
    marginTop: '5%',
    backgroundColor: 'blue',
    marginHorizontal: '20%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});
