import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAOE2o1mIuPEbTKLr5tsHvj_LGMI8KP0z4", // required
  authDomain: "authentication-app-686b4.firebaseapp.com",
  databaseURL: "https://authentication-app-686b4.firebaseio.com",
  projectId: "authentication-app-686b4", // required
  storageBucket: "authentication-app-686b4.appspot.com",
  messagingSenderId: "899446666901",
  appId: "1:899446666901:web:152c56ac05d28c946a8d9c", // required
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default firebase;
// test mode
// {
//   "rules": {
//     ".read": "now < 1605978000000",  // 2020-11-22
//     ".write": "now < 1605978000000",  // 2020-11-22
//   }
// }
