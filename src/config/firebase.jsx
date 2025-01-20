// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCaWzDkDX0SzGtijjMqNrnAKKGdEvdOJ2Y",
  authDomain: "expenss-tracker-538df.firebaseapp.com",
  projectId: "expenss-tracker-538df",
  storageBucket: "expenss-tracker-538df.firebasestorage.app",
  messagingSenderId: "33728111929",
  appId: "1:33728111929:web:988e29939225c773e974e8",
  measurementId: "G-8PZE09W5V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();


export default app;


