import React, {useState, useEffect} from 'react';
import FBAuthContext from './FBAuthContext';
import auth from '@react-native-firebase/auth';

export default function FBAuthProvider({children}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      console.log('auth state changed');
      if (user) {
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
        setUser(user);
      }
    });
  }, []);

  return (
    <FBAuthContext.Provider
      value={{
        loggedIn: loggedIn,
        user: user,
      }}>
      {children}
    </FBAuthContext.Provider>
  );
}
