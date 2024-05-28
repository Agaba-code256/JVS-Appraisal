import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  off,
  remove,
  update,
} from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPd9bKjRquGlgOySns3xN7L7EtzI3kJDU",
  authDomain: "appraisal-7de11.firebaseapp.com",
  databaseURL: "https://appraisal-7de11-default-rtdb.firebaseio.com/",
  projectId: "appraisal-7de11",
  storageBucket: "appraisal-7de11.appspot.com",
  messagingSenderId: "575098408176",
  appId: "1:575098408176:web:e9978286e7c756730f0635",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const imgDB = getStorage(app);

export { app, auth, database, imgDB, ref, onValue, off, remove, update };
