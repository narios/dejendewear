import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyA1cyGV_KpbJkZutQ17m7WFx71_2YxXnzs",
  authDomain: "puebasaquaxis.firebaseapp.com",
  databaseURL: "https://puebasaquaxis.firebaseio.com",
  projectId: "puebasaquaxis",
  storageBucket: "puebasaquaxis.appspot.com",
  messagingSenderId: "761275232991",
  appId: "1:761275232991:web:90b9e14d8e39c8300a2f6a"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
