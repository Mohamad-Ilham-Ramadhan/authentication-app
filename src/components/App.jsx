import React from "react";
var firebaseConfig = {
  apiKey: "AIzaSyAOE2o1mIuPEbTKLr5tsHvj_LGMI8KP0z4",
  authDomain: "authentication-app-686b4.firebaseapp.com",
  databaseURL: "https://authentication-app-686b4.firebaseio.com",
  projectId: "authentication-app-686b4",
  storageBucket: "authentication-app-686b4.appspot.com",
  messagingSenderId: "899446666901",
  appId: "1:899446666901:web:152c56ac05d28c946a8d9c",
};
// Initialize Firebase
const firebaseInit = firebase.initializeApp(firebaseConfig);

console.log(firebaseInit);
export default function App() {
  return (
    <div>
      <h1>Mohamad Ilham Ramadhan</h1>
    </div>
  );
}
