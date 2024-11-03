// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore"); // Import Firestore
// const { getAnalytics } = require("firebase/analytics"); // Uncomment if using Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlSSAZGCcIhmQme9ji81d7srSrN61Piu4",
  authDomain: "task-manager-abd99.firebaseapp.com",
  projectId: "task-manager-abd99",
  storageBucket: "task-manager-abd99.appspot.com",
  messagingSenderId: "775919234887",
  appId: "1:775919234887:web:25a68073c75e6c07c8e662",
  measurementId: "G-3P42NBLYZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Uncomment if using Analytics

// Initialize Firestore
const db = getFirestore(app); // Add Firestore initialization

module.exports = { db }; // Export db for use in other files
