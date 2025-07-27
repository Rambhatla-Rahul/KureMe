'use client';
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import axios from "axios";

// Create the context
const UserContext = createContext(null);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userLogout = async () => {
    try {
      await auth.signOut();
      const patientDetails = localStorage.getItem('patientDetails');
      if (patientDetails) {
        localStorage.removeItem('patientDetails');
      }
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      localStorage.setItem('user', JSON.stringify(firebaseUser));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <UserContext.Provider value={{ user,setUser,loading,userLogout}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
