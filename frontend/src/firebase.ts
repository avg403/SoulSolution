import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm6T3-HROgL6XkiPunxXjYk_EPM0N9OXs",
  authDomain: "soulsolution-4b169.firebaseapp.com",
  projectId: "soulsolution-4b169",
  storageBucket: "soulsolution-4b169.appspot.com", // Fixed storage bucket format
  messagingSenderId: "56021692490",
  appId: "1:56021692490:web:5b4ea2bd40e6d2c7ddb6b3",
  measurementId: "G-NLHPTHLNK2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage = getStorage(app); // Export storage instance

export { Firestore };