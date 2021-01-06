import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';

import auth, {firebase} from '@react-native-firebase/auth';

import FirebaseContext from '../../Contexts/FirebaseContext';
import {
  AppBackgroundColor,
  AppSecondaryColor,
  PASSWORD_LENGTH,
} from '../Utils/Constants';
import CustomTextInput from '../CustomComponents/CustomTextInput';
import CustomPressable from '../CustomComponents/CustomPressable';

export default function ChangePassword(props) {
  const firebaseContext = useContext(FirebaseContext);
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
      if (newPassword.length < PASSWORD_LENGTH) {
        setNewPasswordErrorMessage('password too short (min. 8)');
        return;
      }

      if (newPassword !== verifyNewPassword) {
        setNewPasswordErrorMessage('Passwords do not match.');
        return;
      }

      const credential = firebase.auth.EmailAuthProvider.credential(
        firebaseContext.user.email,
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
        <CustomTextInput
          style={styles.infoInput}
          inputTextColor="white"
          placeholder="Current Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(text) => setCurrentPassword(text)}
        />
        <Text style={styles.errorMessage}>{currentPasswordErrorMessage}</Text>
        <CustomTextInput
          style={styles.infoInput}
          inputTextColor="white"
          placeholder="New Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(text) => setNewPassword(text)}
        />
        <Text style={styles.errorMessage}>{newPasswordErrorMessage}</Text>
        <CustomTextInput
          style={styles.infoInput}
          inputTextColor="white"
          placeholder="Verify New Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(text) => setVerifyNewPassword(text)}
        />
        <CustomPressable
          style={styles.button}
          onPressIn={() => changePassword()}
          text="Submit"
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
  changePasswordFormContainer: {
    marginVertical: '3%',
    flex: 1,
    borderRadius: 10,
    borderColor: 'silver',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  title: {
    flex: 0.2,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: '2%',
    fontFamily: 'Dosis-Bold',
  },
  infoInput: {
    backgroundColor: `${AppSecondaryColor}`,
    alignSelf: 'center',
  },
  errorMessage: {
    flex: 0.12,
    marginLeft: '5%',
    marginTop: '-4%',
    color: '#cc0000',
    fontSize: 11,
    fontWeight: '400',
    alignSelf: 'flex-start',
    fontFamily: 'Dosis-Medium',
  },
  button: {
    alignSelf: 'center',
  },
});
