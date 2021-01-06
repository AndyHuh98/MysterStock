import React, {useState, useContext, useMemo} from 'react';
import {useEffect} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';

import FirebaseContext from '../../Contexts/FirebaseContext';
import ChangeEmail from '../Auth/ChangeEmail';
import ChangePassword from '../Auth/ChangePassword';
import LoginScreen from '../Auth/LoginScreen';
import CustomPressable from '../CustomComponents/CustomPressable';
import {AppBackgroundColor, AppSecondaryColor} from '../Utils/Constants';

export default function ProfileScreen(props) {
  const firebaseContext = useContext(FirebaseContext);
  const [changePWModalVisible, setChangePWModalVisible] = useState(false);
  const [changeEmailModalVisible, setChangeEmailModalVisible] = useState(false);

  useEffect(() => {
    return () => setChangePWModalVisible(false);
  }, [firebaseContext.user]);

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
            <CustomPressable
              style={styles.button}
              onPressIn={() => toggleEmailModalVisible()}
              text="Change Email"
            />
            <CustomPressable
              style={styles.button}
              onPressIn={() => {
                console.log('Activating Modal For Change PW');
                togglePWModalVisible();
              }}
              text="Change Password"
            />
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
            Thank you for using the application. To enjoy additional features
            such as this one, consider signing up or logging in.
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
              <CustomPressable
                style={styles.modalButton}
                onPressIn={() => {
                  togglePWModalVisible();
                }}
                text="Close Modal"
              />
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
              <CustomPressable
                style={styles.modalButton}
                onPressIn={() => {
                  toggleEmailModalVisible();
                }}
                text="Close Modal"
              />
            </View>
          </View>
        </Modal>
        {firebaseContext.loggedIn && firebaseContext.user.metadata ? (
          <View style={styles.profileInformation}>
            <Text style={styles.profileHeader}>First Take-Off Date</Text>
            <Text style={styles.profileText}>
              Member since{' '}
              {firebaseContext.user.metadata.creationTime.split('T')[0]}
            </Text>
            <Text style={styles.profileHeader}>Registered Email</Text>
            <Text style={styles.profileText}>{firebaseContext.user.email}</Text>
          </View>
        ) : null}
        {firebaseContext.loggedIn ? renderButtonsView() : renderGuestView()}
      </View>
    );
  }, [
    firebaseContext.loggedIn,
    firebaseContext.user,
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
    flex: 0.95,
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: 'green',
    alignSelf: 'center',
  },
  centeredModalContainer: {
    marginHorizontal: '10%',
    flex: 0.6,
    borderRadius: 10,
  },
  buttonsContainer: {
    flex: 0.6,
    justifyContent: 'space-evenly',
  },
  button: {
    alignSelf: 'center',
  },
});
