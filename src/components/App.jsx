import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import store from "../config/redux/store";
import firebase, { database } from "../config/firebase";
// actions:
import setUserLoading from "../config/redux/actions/setUserLoading";
import setLoginLoading from "../config/redux/actions/setLoginLoading";
import setRegisterLoading from "../config/redux/actions/setRegisterLoading";
import setUser from "../config/redux/actions/setUser";
import setLoginAuth from "../config/redux/actions/setLoginAuth";
export default function App() {
  useEffect(() => {
    console.log("APP DID MOUNT!");
    const dispatch = store.dispatch;
    firebase.auth().onAuthStateChanged(function (user) {
      console.log("ON AUTH STATE CHANGE CALLED!");
      if (user) {
        // fetch user
        dispatch(setUserLoading(true));
        console.log("Fetch user!!");
        console.log(user);
        database
          .ref(`users/${user.uid}`)
          .once("value")
          .then((snapshot) => {
            dispatch(setUser(snapshot.val()));
            dispatch(setLoginAuth(true));
            dispatch(setUserLoading(false));
            dispatch(setRegisterLoading(false));
            dispatch(setLoginLoading(false));
          });
      } else {
        // dont fetch
        console.log("Don't fetch user!!");
        dispatch(setUserLoading(false));
        dispatch(setRegisterLoading(false));
        dispatch(setLoginLoading(false));
      }
    });
  });
  return (
    <Router>
      <Routes />
    </Router>
  );
}
