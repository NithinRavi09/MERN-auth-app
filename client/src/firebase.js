// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b24f5.firebaseapp.com",
  projectId: "mern-auth-b24f5",
  storageBucket: "mern-auth-b24f5.firebasestorage.app",
  messagingSenderId: "229336040914",
  appId: "1:229336040914:web:eaadc39217d56cc8f8b40b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;