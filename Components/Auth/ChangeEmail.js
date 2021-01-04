import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';

import auth, {firebase} from '@react-native-firebase/auth';

import images from '../../assets/images';
import FBAuthContext from '../../Contexts/FBAuthContext';

export default function ChangeEmail(props) {
  const authContext = useContext(FBAuthContext);
  const [currentPassword, setCurrentPassword] = useState(undefined);
  const [newEmail, setNewEmail] = useState(undefined);
  const [verifyNewEmail, setVerifyNewEmail] = useState(undefined);
  const [newEmailErrorMessage, setNewEmailErrorMessage] = useState(undefined);
  const [verifyEmailErrorMessage, setVerifyEmailErrorMessage] = useState(
    undefined,
  );
  const [
    currentPasswordErrorMessage,
    setCurrentPasswordErrorMessage,
  ] = useState(undefined);

  const changeEmail = async () => {
    setNewEmailErrorMessage(undefined);
    setVerifyEmailErrorMessage(undefined);
    setCurrentPasswordErrorMessage(undefined);
    Keyboard.dismiss();

    if (!newEmail) {
      setNewEmailErrorMessage('Please input valid email.');
    }

    if (!verifyNewEmail) {
      setVerifyEmailErrorMessage('Please input valid email.');
      return;
    }

    if (newEmail && verifyNewEmail) {
      if (newEmail !== verifyNewEmail) {
        setVerifyEmailErrorMessage('Emails do not match.');
        return;
      }

      const credential = firebase.auth.EmailAuthProvider.credential(
        authContext.user.email,
        currentPassword,
      );

      auth()
        .currentUser.reauthenticateWithCredential(credential)
        .then(() => {
          auth()
            .currentUser.updateEmail(newEmail)
            .then(() => {
              authContext.setEmail(newEmail);
              props.navigation.navigate('More');
            })
            .catch((error) => {
              console.log(error);
              if (error.code === 'auth/email-already-in-use') {
                setNewEmailErrorMessage('email already in use');
              }
            });
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/wrong-password') {
            setCurrentPasswordErrorMessage('wrong password provided');
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.background}
        style={styles.imageBackground}>
        <View style={styles.changePasswordFormContainer}>
          <Text style={styles.title}>Change Credentials</Text>
          <TextInput
            style={styles.infoInput}
            placeholder="Current Password"
            placeholderTextColor="silver"
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(text) => setCurrentPassword(text)}
          />
          <Text style={styles.errorMessage}>{currentPasswordErrorMessage}</Text>
          <TextInput
            style={styles.infoInput}
            placeholder="New Email"
            placeholderTextColor="silver"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(text) => setNewEmail(text)}
          />
          <Text style={styles.errorMessage}>{newEmailErrorMessage}</Text>
          <TextInput
            style={styles.infoInput}
            placeholder="Verify New Email"
            placeholderTextColor="silver"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(text) => setVerifyNewEmail(text)}
          />
          <Text style={styles.errorMessage}>{verifyEmailErrorMessage}</Text>
          <Pressable style={styles.button} onPressIn={() => changeEmail()}>
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
