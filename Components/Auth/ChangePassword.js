import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';

import auth, {firebase} from '@react-native-firebase/auth';

import FBAuthContext from '../../Contexts/FBAuthContext';
import {AppBackgroundColor, AppSecondaryColor} from '../Utils/Constants';

// TODO: Extract all text inputs into a single component with standardized styling.
// TODO: Extract all Pressables in forms into a single component with standardized styling.
export default function ChangePassword(props) {
  const authContext = useContext(FBAuthContext);
  const [currentPassword, setCurrentPassword] = useState(undefined);
  const [newPassword, setNewPassword] = useState(undefined);
  const [verifyNewPassword, setVerifyNewPassword] = useState(undefined);
  const [
    currentPasswordErrorMessage,
    setCurrentPasswordErrorMessage,
  ] = useState(undefined);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState(
    undefined,
  );

  const changePassword = async () => {
    setNewPasswordErrorMessage(undefined);
    setCurrentPasswordErrorMessage(undefined);
    Keyboard.dismiss();

    if (!currentPassword || !newPassword) {
      setNewPasswordErrorMessage('Please input values for fields.');
      return;
    } else {
      // TODO: change this to constants.passwordLength
      if (newPassword.length < 8) {
        setNewPasswordErrorMessage('password too short (min. 8)');
        return;
      }

      if (newPassword !== verifyNewPassword) {
        setNewPasswordErrorMessage('Passwords do not match.');
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
            .currentUser.updatePassword(newPassword)
            .then(() => props.navigation.navigate('More'))
            .catch((error) => {
              if (error.code === 'auth/weak-password') {
                setNewPasswordErrorMessage('password too short (min. 8)');
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
          placeholder="New Password"
          placeholderTextColor="silver"
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(text) => setNewPassword(text)}
        />
        <Text style={styles.errorMessage}>{newPasswordErrorMessage}</Text>
        <TextInput
          style={styles.infoInput}
          placeholder="Verify New Password"
          placeholderTextColor="silver"
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(text) => setVerifyNewPassword(text)}
        />
        <Pressable style={styles.button} onPressIn={() => changePassword()}>
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
    marginVertical: '3%',
    marginHorizontal: '5%',
    flex: 1,
    borderRadius: 10,
    borderColor: 'silver',
    borderWidth: StyleSheet.hairlineWidth,
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
    backgroundColor: `${AppSecondaryColor}`,
    borderColor: 'silver',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 0.15,
    marginBottom: '1%',
    marginHorizontal: '5%',
    textAlign: 'center',
    color: 'white',
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
    marginVertical: '2%',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});
