import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// var firebaseConfig = {
// // new firebase configure 
//   apiKey: "AIzaSyAn2DYg6GKmuJXZbfBY1QympORXkhGYPrA",
//   authDomain: "stripe-propinas.firebaseapp.com",
//   projectId: "stripe-propinas",
//   storageBucket: "stripe-propinas.appspot.com",
//   messagingSenderId: "890308201700",
//   appId: "1:890308201700:web:cab72b271a55b4d41870f1",
//   measurementId: "G-CM2MH8S1FQ"
// };

// var firebaseConfig = {
//   // new firebase configure 
//     apiKey: "AIzaSyAZsjlYN8T4BHx6yBxSbdLl_AMeLjARYhw",
//     authDomain: "stripe-propinas.firebaseapp.com",
//     projectId: "stripe-propinas",
//     storageBucket: "stripe-propinas.appspot.com",
//     messagingSenderId: "721503229986",
//     appId: "1:721503229986:android:fb82ca6c48c426e014927b",
//    // measurementId: "G-CM2MH8S1FQ"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyCIGF8orjCPnYYPogec6jBJYTyKA4-WaWw",
  authDomain: "backend-tipeame.firebaseapp.com",
  projectId: "backend-tipeame",
  storageBucket: "backend-tipeame.appspot.com",
  messagingSenderId: "505385402362",
  appId: "1:505385402362:web:dc00a0b5c78f34c7c92e43"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

export var db = firebase.firestore();
export var auth = firebase.auth();
