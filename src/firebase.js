// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcVdp-V9VFq53_l8IAUsWcwIFK0HjZFH0",
  authDomain: "todolistweb-b95de.firebaseapp.com",
  projectId: "todolistweb-b95de",
  storageBucket: "todolistweb-b95de.appspot.com",
  messagingSenderId: "806838526057",
  appId: "1:806838526057:web:d640d5d3e6c542038182f8",
  measurementId: "G-CV43Q58N5F"
};

// ✅ Cegah duplikasi
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
