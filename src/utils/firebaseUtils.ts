// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-wzB4qmgJMjV4axd9627xbfWNzuQf6SA",
  authDomain: "manga-project-f1b1d.firebaseapp.com",
  projectId: "manga-project-f1b1d",
  storageBucket: "manga-project-f1b1d.appspot.com",
  messagingSenderId: "984020651245",
  appId: "1:984020651245:web:4dda9791fa7ac7c12dd0e4",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
