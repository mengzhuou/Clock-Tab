
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC0cALNXE1tYog9x-Je1DTngd2GjVqJBog",
    authDomain: "clock-tab.firebaseapp.com",
    projectId: "clock-tab",
    storageBucket: "clock-tab.appspot.com",
    messagingSenderId: "147250836459",
    appId: "1:147250836459:web:4d9b6d7412a869bfb8dfae",
    measurementId: "G-BT1XM9VFVF"
})
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = firebaseApp.firestore();

export { dp };
