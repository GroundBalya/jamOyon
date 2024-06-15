// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB_SLXu6gaVmkE0TS2yyGRu3FQ843nFYHI",
    authDomain: "bejamoyon.firebaseapp.com",
    projectId: "bejamoyon",
    storageBucket: "bejamoyon.appspot.com",
    messagingSenderId: "553656094593",
    appId: "1:553656094593:web:47d4ab7217c4dab86ea280",
    measurementId: "G-4WXTRWZY0C",
    databaseURL: "https://bejamoyon-default-rtdb.asia-southeast1.firebasedatabase.app" // Updated database URL
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

export default db;
