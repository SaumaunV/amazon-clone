import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCkNAn5d1ptPMoJa-HIruqC170FiFWYjtU",
  authDomain: "clone-e06ca.firebaseapp.com",
  projectId: "clone-e06ca",
  storageBucket: "clone-e06ca.appspot.com",
  messagingSenderId: "773152505386",
  appId: "1:773152505386:web:20595d182f21298d818d53",
  measurementId: "G-RWSE1LZR8E",
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const auth = getAuth(app);


export {db, auth};
