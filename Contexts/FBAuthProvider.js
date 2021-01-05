import React, {useState, useEffect, useMemo} from 'react';
import FBAuthContext from './FBAuthContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// TODO: Change name of context to FirebaseContext
export default function FBAuthProvider({children}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);
  const [userFavorites, setUserFavorites] = useState(new Map());
  const [unsubscribe, setUnsubscribe] = useState(() => {});

  const setEmail = (email) => {
    setUser({email: email});
  };

  const clearState = () => {
    setLoggedIn(false);
    setUser(undefined);
  };

  useEffect(() => {
    let unsub;
    auth().onAuthStateChanged((usr) => {
      console.log('user auth state changed');
      if (usr) {
        console.log('FBAuthProvider: User Valid');
        setLoggedIn(true);
        setUser(usr);
      } else {
        clearState();
      }
    });

    if (user) {
      console.log('FBAuthProvider: User Valid, setting favorites listener');
      unsub = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          if (snapshot && snapshot._data) {
            setUserFavorites(snapshot._data.favorites);
          } else {
            setUserFavorites(new Map());
          }
        });
      setUnsubscribe((prev) => unsub);
    }
  }, [user, loggedIn]);

  return useMemo(() => {
    const signOut = () => {
      unsubscribe();
      auth().signOut();
    };

    return (
      <FBAuthContext.Provider
        value={{
          loggedIn: loggedIn,
          user: user,
          userFavorites: userFavorites,
          setEmail: setEmail,
          signOut: signOut,
        }}>
        {children}
      </FBAuthContext.Provider>
    );
  }, [children, loggedIn, unsubscribe, user, userFavorites]);
}
