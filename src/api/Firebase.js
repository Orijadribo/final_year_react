// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPcuSwsWJgjbVCI2uaj9x3Fg7buTvgMsM",
  authDomain: "bankslipverificationsystem.firebaseapp.com",
  databaseURL: "https://bankslipverificationsystem-default-rtdb.firebaseio.com",
  projectId: "bankslipverificationsystem",
  storageBucket: "bankslipverificationsystem.appspot.com",
  messagingSenderId: "276466073371",
  appId: "1:276466073371:web:ca099b87323bfeefa25dbe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

export default database;
