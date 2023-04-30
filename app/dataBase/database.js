// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDjvzRjLCsPHuFPT05ygwakYSG7XBZ76dE",
  authDomain: "hackacom-food-app.firebaseapp.com",
  projectId: "hackacom-food-app",
  storageBucket: "hackacom-food-app.appspot.com",
  messagingSenderId: "328878315052",
  appId: "1:328878315052:web:03bf2e6975e7e681e4a389",
  measurementId: "G-3EZKRB9XCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db}