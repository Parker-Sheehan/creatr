import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXWrlYB3SCXfsEc0LCtz5tRqgQjZObkRA",
    authDomain: "creatr-7ee7c.firebaseapp.com",
    projectId: "creatr-7ee7c",
    storageBucket: "creatr-7ee7c.appspot.com",
    messagingSenderId: "954577636597",
    appId: "1:954577636597:web:c75970b6a82e6dc66ec9bc",
    measurementId: "G-77MC7CDP5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage()

export default storage