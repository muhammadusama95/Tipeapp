import * as firebase from 'firebase';

firebase.initializeApp({
  //  apiKey: "AIzaSyAn2DYg6GKmuJXZbfBY1QympORXkhGYPrA",
  // authDomain: "stripe-propinas.firebaseapp.com",
  // projectId: "stripe-propinas",
  // storageBucket: "stripe-propinas.appspot.com",
  // messagingSenderId: "890308201700",
  // appId: "1:890308201700:web:cab72b271a55b4d41870f1",
  // measurementId: "G-CM2MH8S1FQ"

  apiKey: "AIzaSyAZsjlYN8T4BHx6yBxSbdLl_AMeLjARYhw",
  authDomain: "stripe-propinas.firebaseapp.com",
  projectId: "stripe-propinas",
  storageBucket: "stripe-propinas.appspot.com",
  messagingSenderId: "721503229986",
  appId: "1:721503229986:android:fb82ca6c48c426e014927b",
  measurementId: "G-CM2MH8S1FQ"

  // apiKey: "AIzaSyAn2DYg6GKmuJXZbfBY1QympORXkhGYPrA",
  // authDomain: "stripe-propinas.firebaseapp.com",
  // projectId: "stripe-propinas",
  // storageBucket: "stripe-propinas.appspot.com",
  // messagingSenderId: "890308201700",
  // appId: "1:890308201700:web:cab72b271a55b4d41870f1",
  // measurementId: "G-CM2MH8S1FQ"
  
});
export const authRef = firebase.auth();
