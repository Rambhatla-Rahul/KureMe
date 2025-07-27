// lib/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { auth } from "./firebase"; // Your initialized auth instance

// Sign up with email and password
export const signUpWithEmailPassword = async (email, password,displayName='') => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    result.user.displayName = displayName;
    return result.user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Login with email and password
export const loginWithEmailPassword = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Login with Google (optional, for social login)
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
