// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi2IOAV31CbgOp9P99EE9lElaWHQUkV5k",
  authDomain: "my-quiz-app-3be14.firebaseapp.com",
  databaseURL: "https://my-quiz-app-3be14-default-rtdb.firebaseio.com",
  projectId: "my-quiz-app-3be14",
  storageBucket: "my-quiz-app-3be14.appspot.com",
  messagingSenderId: "31153745842",
  appId: "1:31153745842:web:f5e2d01bf21fbb727c3eab",
  measurementId: "G-RY9BH31J3F"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app)
const analytics = getAnalytics(app);