// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZpvI-EcmRiqrU-QQYWFZ3pxmwKYgZ88g",
    authDomain: "assignment-11-9bd1a.firebaseapp.com",
    projectId: "assignment-11-9bd1a",
    storageBucket: "assignment-11-9bd1a.appspot.com",
    messagingSenderId: "920943418066",
    appId: "1:920943418066:web:3af92e306afbbfd17eeb0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
const auth = getAuth(app);
export default auth;