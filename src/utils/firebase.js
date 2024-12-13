// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFlzMGsxCeKA1SF8nxETx0aCyRkorwCD0",
  authDomain: "samplenetflixapp-fcfc1.firebaseapp.com",
  projectId: "samplenetflixapp-fcfc1",
  storageBucket: "samplenetflixapp-fcfc1.firebasestorage.app",
  messagingSenderId: "483707025179",
  appId: "1:483707025179:web:240805d320182e900b85be",
  measurementId: "G-RTQQ6RG2ER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics)

export const auth = getAuth();