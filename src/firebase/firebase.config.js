// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBybXxVpy-IjZNjca_YXe91tx8ezV26hS4",
  authDomain: "baganbari-bb64e.firebaseapp.com",
  projectId: "baganbari-bb64e",
  storageBucket: "baganbari-bb64e.appspot.com",
  messagingSenderId: "378246698889",
  appId: "1:378246698889:web:cdd7431a8fb1c109bfb358"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;