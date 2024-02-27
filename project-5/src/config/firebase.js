// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVogJzojde7BmgDQ-1cBTw8U3YoujHc04",
  authDomain: "vite-contact-690eb.firebaseapp.com",
  projectId: "vite-contact-690eb",
  storageBucket: "vite-contact-690eb.appspot.com",
  messagingSenderId: "218907033566",
  appId: "1:218907033566:web:6cb89e734b8df4fb3be74f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);