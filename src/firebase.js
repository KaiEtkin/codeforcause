// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBl6oMEn4gnjFm8GqP_OGcVaiOtS_g7tt0",
    authDomain: "stem-made-fun.firebaseapp.com",
    projectId: "stem-made-fun",
    storageBucket: "stem-made-fun.appspot.com",
    messagingSenderId: "746057185264",
    appId: "1:746057185264:web:d5ac1fe7b740356329cf35",
    measurementId: "G-40W72MKEPF"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
const analytics = getAnalytics(app);