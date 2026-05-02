import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "raketech-app-2026",
  appId: "1:93292793240:web:a9c82aa56c07f8f317efed",
  storageBucket: "raketech-app-2026.firebasestorage.app",
  apiKey: "AIzaSyBL0qsRIItrY43QuySEBfV22eX5pc-0zbc",
  authDomain: "raketech-app-2026.firebaseapp.com",
  messagingSenderId: "93292793240"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
