import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from "firebase/auth";
import app from '../Firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const SignInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (updatedData) => updateProfile(auth.currentUser, updatedData);
  const logOut = () => signOut(auth);

  
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    signIn,
    SignInGoogle,
    updateUser,
    logOut,
    resetPassword, 
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
