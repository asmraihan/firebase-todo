import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// Initialize Firebase  apiKey: import.meta.env.VITE_APIKEY,
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
