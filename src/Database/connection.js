import firebase from "firebase"

let firebaseConfig = {
  apiKey: "AIzaSyAWC_I31Lg0T_b2Suqwc4SH5SRClkkURZg",
  authDomain: "projeto-teste-67eac.firebaseapp.com",
  databaseURL: "https://projeto-teste-67eac.firebaseio.com",
  projectId: "projeto-teste-67eac",
  storageBucket: "projeto-teste-67eac.appspot.com",
  messagingSenderId: "307914561993",
  appId: "1:307914561993:web:0b76da4f7e18601c2bf018",
  measurementId: "G-C01VNS8EVE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;