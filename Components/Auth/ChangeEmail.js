import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Pressable, Keyboard} from 'react-native';

import auth, {firebase} from '@react-native-firebase/auth';

import FBAuthContext from '../../Contexts/FBAuthContext';
import {AppBackgroundColor, AppSecondaryColor} from '../Utils/Constants';
import CustomTextInput from '../CustomComponents/CustomTextInput';

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
      <View style={styles.changePasswordFormContainer}>
        <Text style={styles.title}>Change Email</Text>
        <CustomTextInput
          style={styles.infoInput}
          placeholder="Current Password"
          inputTextColor="white"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(text) => setCurrentPassword(text)}
        />
        <Text style={styles.errorMessage}>{currentPasswordErrorMessage}</Text>
        <CustomTextInput
          style={styles.infoInput}
          inputTextColor="white"
          placeholder="New Email"
          autoCapitalize="none"
          onChangeText={(text) => setNewEmail(text)}
        />
        <Text style={styles.errorMessage}>{newEmailErrorMessage}</Text>
        <CustomTextInput
          style={styles.infoInput}
          inputTextColor="white"
          placeholder="Verify New Email"
          autoCapitalize="none"
          onChangeText={(text) => setVerifyNewEmail(text)}
        />
        <Text style={styles.errorMessage}>{verifyEmailErrorMessage}</Text>
        <Pressable style={styles.button} onPressIn={() => changeEmail()}>
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
  },
  changePasswordFormContainer: {
    flex: 1,
    borderRadius: 10,
    borderColor: 'silver',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  title: {
    flex: 0.15,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  infoInput: {
    backgroundColor: `${AppSecondaryColor}`,
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
    flex: 0.125,
    backgroundColor: '#0067da',
    marginHorizontal: '20%',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});
