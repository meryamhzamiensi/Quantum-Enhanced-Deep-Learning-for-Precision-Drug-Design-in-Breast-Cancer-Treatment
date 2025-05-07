// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCfgEgJXgFVCNvEtMrGwq1Cz4brF2CNC7g",
  authDomain: "medicare-react-f4673.firebaseapp.com",
  projectId: "medicare-react-f4673",
  storageBucket: "medicare-react-f4673.appspot.com",
  messagingSenderId: "655234591254",
  appId: "1:655234591254:web:b7538f00826bbe3d6ce337",
  measurementId: "G-89KF8GPSWY",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore database instance
const db = getFirestore(app);

// Get Firebase Authentication instance
const auth = getAuth(app); // You can pass the app instance to get the associated auth

// Export Firebase app, auth, and db for use in other parts of the app
export { app, auth, db };
