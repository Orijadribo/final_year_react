import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore/lite"; // Use setDoc instead of set
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPcuSwsWJgjbVCI2uaj9x3Fg7buTvgMsM",
  authDomain: "bankslipverificationsystem.firebaseapp.com",
  databaseURL: "https://bankslipverificationsystem-default-rtdb.firebaseio.com",
  projectId: "bankslipverificationsystem",
  storageBucket: "bankslipverificationsystem.appspot.com",
  messagingSenderId: "276466073371",
  appId: "1:276466073371:web:ca099b87323bfeefa25dbe",
};

// Initialize Firebase for Firestore
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Get authentication instance
const auth = getAuth(app);

export { firestore, collection, doc, getDoc, setDoc, auth, createUserWithEmailAndPassword };

