import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  off,
  remove,
  update,
  get,
  equalTo,
  query,
  orderByChild,
} from "firebase/database";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const imgDB = getStorage(app);

export {
  app,
  auth,
  database,
  imgDB,
  ref,
  onValue,
  off,
  equalTo,
  remove,
  query,
  orderByChild,
  get,
  update,
  uploadBytes,
  getDownloadURL,
  storageRef,
};
