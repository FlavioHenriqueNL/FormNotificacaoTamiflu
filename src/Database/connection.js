import firebase from "firebase"

let firebaseConfig = {
    apiKey: "AIzaSyAW3VMDiSzXlnrScbYATbWskasIVy_cc7U",
    authDomain: "saudearapiraca-farmaciateste.firebaseapp.com",
    databaseURL: "https://saudearapiraca-farmaciateste.firebaseio.com",
    projectId: "saudearapiraca-farmaciateste",
    storageBucket: "saudearapiraca-farmaciateste.appspot.com",
    messagingSenderId: "176365758465",
    appId: "1:176365758465:web:d266a9f5fca4b1db3d7800"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;