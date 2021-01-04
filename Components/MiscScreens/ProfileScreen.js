import React, {useState, useContext} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Modal,
} from 'react-native';
import images from '../../assets/images';

import FBAuthContext from '../../Contexts/FBAuthContext';
import ChangeEmail from '../Auth/ChangeEmail';
import ChangePassword from '../Auth/ChangePassword';
import LoginScreen from '../Auth/LoginScreen';

export default function ProfileScreen(props) {
  const authContext = useContext(FBAuthContext);
  const [changePWModalVisible, setChangePWModalVisible] = useState(false);
  const [changeEmailModalVisible, setChangeEmailModalVisible] = useState(false);

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

  useEffect(() => {
    return () => setChangePWModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.background}
        style={styles.imageBackground}>
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
        {authContext.loggedIn ? (
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  guestText: {
    alignSelf: 'center',
    color: 'white',
    fontStyle: 'italic',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  profileInformation: {
    marginTop: '30%',
    marginHorizontal: '10%',
  },
  profileHeader: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileText: {
    alignSelf: 'center',
    color: 'black',
  },
  modalImageBackground: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  activateModalsContainer: {
    flex: 0.5,
    justifyContent: 'center',
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
    borderWidth: 3,
    flex: 0.3,
    backgroundColor: 'blue',
    marginHorizontal: '20%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});
