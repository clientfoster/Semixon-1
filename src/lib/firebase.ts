import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

// Initialize Firestore with optimized settings to prevent timeout issues
let db;
try {
  // Try to initialize Firestore with long polling for better connectivity
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    ignoreUndefinedProperties: true,
  });
} catch (error) {
  // Fallback to regular getFirestore if initializeFirestore fails
  console.warn('Falling back to regular Firestore initialization:', error);
  try {
    db = getFirestore(app);
  } catch (fallbackError) {
    console.error('Failed to initialize Firestore:', fallbackError);
    throw fallbackError;
  }
}

// Initialize Firebase Auth
const auth = getAuth(app);

export { app, db, auth };
