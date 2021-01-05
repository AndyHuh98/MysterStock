import React, {useState, useEffect, useMemo} from 'react';
import FBAuthContext from './FBAuthContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function FBAuthProvider({children}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);
  const [userFavorites, setUserFavorites] = useState(new Map());

  const setEmail = (email) => {
    setUser({email: email});
  };

  useEffect(() => {
    auth().onAuthStateChanged((usr) => {
      console.log(usr);
      if (usr) {
        console.log('FBAuthProvider: User Valid');
        setLoggedIn(true);
        setUser(usr);
        firestore()
          .collection('users')
          .doc(usr.uid)
          .onSnapshot((snapshot) => {
            setUserFavorites(snapshot._data.favorites);
          });
      } else {
        setLoggedIn(false);
        setUser(undefined);
      }
    });
  }, []);

  return useMemo(() => {
    return (
      <FBAuthContext.Provider
        value={{
          loggedIn: loggedIn,
          user: user,
          userFavorites: userFavorites,
          setEmail: setEmail,
        }}>
        {children}
      </FBAuthContext.Provider>
    );
  }, [children, loggedIn, user, userFavorites]);
}
