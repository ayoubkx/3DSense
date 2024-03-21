// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIfgpLG4aHalsMipBkazJE14G4_-K66LI",
  authDomain: "dsense-8baa5.firebaseapp.com",
  databaseURL: "https://dsense-8baa5-default-rtdb.firebaseio.com",
  projectId: "dsense-8baa5",
  storageBucket: "dsense-8baa5.appspot.com",
  messagingSenderId: "553957823797",
  appId: "1:553957823797:web:aa6253f212f0aad56ba87c",
  measurementId: "G-9FDGXFFR3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  

const db = getDatabase(app);


export default db;