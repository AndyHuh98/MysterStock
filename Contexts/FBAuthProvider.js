import React, {useState, useEffect} from 'react';
import FBAuthContext from './FBAuthContext';
import auth from '@react-native-firebase/auth';

export default function FBAuthProvider({children}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);

  const setEmail = (email) => {
    setUser({email: email});
  };

  useEffect(() => {
    auth().onAuthStateChanged((usr) => {
      console.log(usr);
      if (usr) {
        setLoggedIn(true);
        setUser(usr);
      } else {
        setLoggedIn(false);
        setUser(undefined);
      }
    });
  }, []);

  return (
    <FBAuthContext.Provider
      value={{
        loggedIn: loggedIn,
        user: user,
        setEmail: setEmail,
      }}>
      {children}
    </FBAuthContext.Provider>
  );
}
