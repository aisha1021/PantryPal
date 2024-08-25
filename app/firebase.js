// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2H10TQmssvHdcNd7yeb94kJr3A4G6UkE",
  authDomain: "inventory-management-app-49000.firebaseapp.com",
  projectId: "inventory-management-app-49000",
  storageBucket: "inventory-management-app-49000.appspot.com",
  messagingSenderId: "856939979137",
  appId: "1:856939979137:web:44023695b008662762c880",
  measurementId: "G-JTN26BL3T9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {firestore}