// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA9bRTd7YLGsuPgysOSUKhLsH3XEb6Szq0",
  authDomain: "react-chat-1b96b.firebaseapp.com",
  projectId: "react-chat-1b96b",
  storageBucket: "react-chat-1b96b.appspot.com",
  messagingSenderId: "949331730577",
  appId: "1:949331730577:web:01dd10117c1d7938aadf30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

export {app, auth, storage, db};