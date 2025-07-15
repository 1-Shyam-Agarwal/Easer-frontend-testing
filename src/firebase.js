import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA07gFIusB8FQmiYZJalTtEEPwINCzCFcA",
  authDomain: "uploaddocuments-3a515.firebaseapp.com",
  projectId: "uploaddocuments-3a515",
  storageBucket: "uploaddocuments-3a515.firebasestorage.app",
  messagingSenderId: "457293873292",
  appId: "1:457293873292:web:aedf76600a37afc0b4fba9",
  measurementId: "G-Q0V5J7MYDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
