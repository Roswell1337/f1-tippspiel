import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6jHBlEUF-Bbwy2lQ3GrKzgrAm9l45UHk",
    authDomain: "f1-tippspiel-f1786.firebaseapp.com",
    projectId: "f1-tippspiel-f1786",
    storageBucket: "f1-tippspiel-f1786.firebasestorage.app",
    messagingSenderId: "677011008398",
    appId: "1:677011008398:web:68cfb1dbce6fbe5c1992df"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);