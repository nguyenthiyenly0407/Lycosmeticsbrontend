// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvfyBF7m96INRL6XY9ANJozlnPdeQxY_M",
  authDomain: "dangnhap-a75f2.firebaseapp.com",
  projectId: "dangnhap-a75f2",
  storageBucket: "dangnhap-a75f2.firebasestorage.app",
  messagingSenderId: "568427789435",
  appId: "1:568427789435:web:b2009912fc22451c9476de",
  measurementId: "G-5EYJCMKZC3"
};

// // Initialize Firebase
 const app = initializeApp(firebaseConfig);


export const auth=getAuth();
export const db=getFirestore(app);
export default app;