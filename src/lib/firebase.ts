import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "studio-262487200-a8a7e",
  "appId": "1:1029715014191:web:a7dbc61a2c4ceb784d4cda",
  "storageBucket": "studio-262487200-a8a7e.firebasestorage.app",
  "apiKey": "AIzaSyAv15b3tb2dnP4D7lOzBIRad8zptcfliQs",
  "authDomain": "studio-262487200-a8a7e.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1029715014191"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
