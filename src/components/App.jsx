import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import store from "../config/redux/store";
import firebase, { database } from "../config/firebase";
// actions:
import setLoadingUser from "../config/redux/actions/setLoadingUser";
import setLoadingLogin from "../config/redux/actions/setLoadingLogin";
import setLoadingRegister from "../config/redux/actions/setLoadingRegister";
import setUser from "../config/redux/actions/setUser";
import setAuthLogin from "../config/redux/actions/setAuthLogin";
import setAuthenticating from "../config/redux/actions/setAuthenticating";
export default function App() {
  useEffect(() => {
    console.log("APP DID MOUNT!");
    const dispatch = store.dispatch;
    // hanya digunakan untuk persistance login
    firebase.auth().onAuthStateChanged(function (user) {
      console.log("ON AUTH STATE CHANGE CALLED!");
      if (user) {
        database
          .ref(`users/${user.uid}`)
          .once("value")
          .then((snapshot) => {
            dispatch(setUser(snapshot.val()));
            dispatch(setAuthenticating(false));
            dispatch(setAuthLogin(true));
            dispatch(setLoadingRegister(false));
            dispatch(setLoadingLogin(false));
          });
      } else {
        // dont fetch
        console.log("Don't fetch user!!");
        dispatch(setAuthenticating(false));
        dispatch(setLoadingRegister(false));
        dispatch(setLoadingLogin(false));
      }
    });
  });
  return (
    <Router>
      <Routes />
    </Router>
  );
}
