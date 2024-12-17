import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importing getAuth from Firebase
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm6T3-HROgL6XkiPunxXjYk_EPM0N9OXs",
  authDomain: "soulsolution-4b169.firebaseapp.com",
  projectId: "soulsolution-4b169",
  storageBucket: "soulsolution-4b169.firebasestorage.app",
  messagingSenderId: "56021692490",
  appId: "1:56021692490:web:5b4ea2bd40e6d2c7ddb6b3",
  measurementId: "G-NLHPTHLNK2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app); // Make sure to export 'auth' here
export const db = getFirestore(app); // Optionally, export Firestore if needed
