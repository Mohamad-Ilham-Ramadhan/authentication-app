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
    const dispatch = store.dispatch;
    // hanya digunakan untuk persistance login
    firebase.auth().onAuthStateChanged(function (user) {
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
