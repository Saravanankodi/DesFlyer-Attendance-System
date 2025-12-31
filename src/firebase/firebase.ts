import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBk-s_TZg2Ge2Fe4Vv_tWzY7ygCTu_0UK4",
  authDomain: "management-system-cf167.firebaseapp.com",
  projectId: "management-system-cf167",
  storageBucket: "management-system-cf167.firebasestorage.app",
  messagingSenderId: "569640694202",
  appId: "1:569640694202:web:845346420668b8b029ed83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized");

export const auth = getAuth(app);
export const db = getFirestore(app);