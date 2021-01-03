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

// TODO: Create auth provider and change the value of user in the auth provider when logging in.
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
      <ImageBackground
        source={images.background}
        style={styles.imageBackground}>
        <View style={styles.loginFormContainer}>
          <Text style={styles.title}>Mission Credentials</Text>
          <TextInput
            style={styles.infoInput}
            placeholder="Email"
            placeholderTextColor="silver"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.infoInput}
            placeholder="Password"
            placeholderTextColor="silver"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <Pressable
            style={styles.button}
            onPressIn={() => submitLoginInformation()}>
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
  modalView: {},
  loginFormContainer: {
    marginVertical: '3%',
    marginHorizontal: '5%',
    flex: 0.5,
    borderRadius: 10,
    borderWidth: 3,
    flexDirection: 'column',
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
    borderWidth: 3,
    flex: 0.15,
    marginBottom: '1%',
    marginHorizontal: '5%',
    textAlign: 'center',
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
    borderWidth: 3,
    flex: 0.15,
    backgroundColor: 'blue',
    marginHorizontal: '20%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});
