import React, {useState, useContext, useMemo} from 'react';
import {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Modal} from 'react-native';

import FBAuthContext from '../../Contexts/FBAuthContext';
import ChangeEmail from '../Auth/ChangeEmail';
import ChangePassword from '../Auth/ChangePassword';
import LoginScreen from '../Auth/LoginScreen';
import {AppBackgroundColor, AppSecondaryColor} from '../Utils/Constants';

export default function ProfileScreen(props) {
  const authContext = useContext(FBAuthContext);
  const [changePWModalVisible, setChangePWModalVisible] = useState(false);
  const [changeEmailModalVisible, setChangeEmailModalVisible] = useState(false);

  useEffect(() => {
    return () => setChangePWModalVisible(false);
  }, [authContext.user]);

  return useMemo(() => {
    const togglePWModalVisible = () => {
      // if user is not logged in (from context, show toast), otherwise open modal.
      setChangePWModalVisible(!changePWModalVisible);
    };

    const toggleEmailModalVisible = () => {
      // if user is not logged in (from context, show toast), otherwise open modal.
      setChangeEmailModalVisible(!changeEmailModalVisible);
    };

    const renderButtonsView = () => {
      return (
        <View style={styles.activateModalsContainer}>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.button}
              onPressIn={() => toggleEmailModalVisible()}>
              <Text style={styles.buttonText}>Change Email</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPressIn={() => {
                console.log('Activating Modal For Change PW');
                togglePWModalVisible();
              }}>
              <Text style={styles.buttonText}>Change Password</Text>
            </Pressable>
          </View>
        </View>
      );
    };

    // TODO: Possibly move this into it's own component
    const renderGuestView = () => {
      return (
        <View style={styles.container}>
          <LoginScreen navigation={props.navigation} />
          <Text style={styles.guestText}>
            Thank you for using the application. To enjoy additional features,
            consider signing up or log in.
          </Text>
        </View>
      );
    };
    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={changePWModalVisible}
          onDismiss={() => setChangePWModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.centeredModalContainer}>
              <ChangePassword navigation={props.navigation} />
              <Pressable
                style={styles.modalButton}
                onPressIn={() => {
                  togglePWModalVisible();
                }}>
                <Text style={styles.buttonText}>Close Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          animationType="slide"
          visible={changeEmailModalVisible}
          onDismiss={() => setChangeEmailModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.centeredModalContainer}>
              <ChangeEmail navigation={props.navigation} />
              <Pressable
                style={styles.modalButton}
                onPressIn={() => {
                  toggleEmailModalVisible();
                }}>
                <Text style={styles.buttonText}>Close Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {authContext.loggedIn && authContext.user.metadata ? (
          <View style={styles.profileInformation}>
            <Text style={styles.profileHeader}>First Take-Off Date</Text>
            <Text style={styles.profileText}>
              Member since{' '}
              {authContext.user.metadata.creationTime.split('T')[0]}
            </Text>
            <Text style={styles.profileHeader}>Registered Email</Text>
            <Text style={styles.profileText}>{authContext.user.email}</Text>
          </View>
        ) : null}
        {authContext.loggedIn ? renderButtonsView() : renderGuestView()}
      </View>
    );
  }, [
    authContext.loggedIn,
    authContext.user,
    changeEmailModalVisible,
    changePWModalVisible,
    props.navigation,
  ]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${AppBackgroundColor}`,
  },
  guestText: {
    alignSelf: 'center',
    color: 'white',
    fontStyle: 'italic',
  },
  profileInformation: {
    marginTop: '30%',
    marginHorizontal: '10%',
    backgroundColor: `${AppSecondaryColor}`,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  profileHeader: {
    marginTop: '5%',
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileText: {
    alignSelf: 'center',
    color: 'silver',
  },
  activateModalsContainer: {
    backgroundColor: `${AppSecondaryColor}`,
    marginHorizontal: '10%',
    flex: 0.5,
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalButton: {
    borderWidth: 3,
    height: 40,
    backgroundColor: 'blue',
    marginHorizontal: '20%',
    justifyContent: 'center',
  },
  centeredModalContainer: {
    marginHorizontal: '10%',
    flex: 0.6,
    borderRadius: 10,
  },
  buttonsContainer: {
    flex: 0.5,
    justifyContent: 'space-evenly',
  },
  button: {
    flex: 0.45,
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
