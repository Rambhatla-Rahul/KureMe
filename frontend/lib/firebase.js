// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC2nYeel3Auf6gdY14Gbp7704H1-TioKXc",
  authDomain: "kureme-1e3ab.firebaseapp.com",
  projectId: "kureme-1e3ab",
  storageBucket: "kureme-1e3ab.firebasestorage.app", // 🔄 fixed .appspot.com
  messagingSenderId: "979237655380",
  appId: "1:979237655380:web:a8e7bd27873f3ac6b96ec1",
  measurementId: "G-N8KDD820X6",
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export auth instance
const auth = getAuth(app);

export { auth };
