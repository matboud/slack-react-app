import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

var firebaseConfig = {
   apiKey: "AIzaSyC5WzXkkMj5IOEfIKFZWeHr7h-jFowwgVs",
   authDomain: "slack-react-app-f4fc7.firebaseapp.com",
   databaseURL: "https://slack-react-app-f4fc7.firebaseio.com",
   projectId: "slack-react-app-f4fc7",
   storageBucket: "slack-react-app-f4fc7.appspot.com",
   messagingSenderId: "747741539013",
   appId: "1:747741539013:web:1b5b97a70b4f16590b1eac",
   measurementId: "G-LS0S4NPV4T"
 };
 
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
//  firebase.analytics();

 export default firebase;