import { createContext, useState } from 'react';
import Router from 'next/router';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import '../lib/firebase';

const AuthContext = createContext();

const provider = new GoogleAuthProvider();
const auth = getAuth();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signin = () => {
    try {
      setLoading(true);
      return signInWithPopup(auth, provider).then((response) => {
        setUser(response.user);
        Router.push('/dashboard');
      });
    } finally {
      setLoading(false);
    }
  };

  const signout = () => {
    try {
      Router.push('/');

      return signOut(auth).then(() => setUser(false));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
