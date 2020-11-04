import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import ProfileEdit from "./profile-edit";

// test
import firebase from "../config/firebase/index";
// actions
import setLoginAuth from "../config/redux/actions/setLoginAuth";
import setUser from "../config/redux/actions/setUser";
function Routes({ isLogin, setLoginAuth, setUser, uid }) {
  const history = useHistory();
  useEffect(() => {
    console.log(history);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const userUsed = {
          providerId: user.providerData[0].providerId,
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          phoneNumber: user.phoneNumber,
          password: "-",
        };
        console.log("User =>", user);
        setUser(userUsed);
        setLoginAuth(true);
      } else {
        // No user is signed in.
        console.log("Gak ada user yang sign in geh!");
      }
    });
  }, []);
  useEffect(() => {
    if (isLogin) {
      history.push(`/profile/${uid}`);
    }
  }, [isLogin]);
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/profile/:id/edit">
        <ProfileEdit />
      </Route>
      <Route path="/profile/:id">
        <Profile />
      </Route>
      <Route path="/" exact>
        <Register />
      </Route>
    </Switch>
  );
}
function mapState(state) {
  return {
    isLogin: state.auth.login,
    uid: state.user.uid,
  };
}
function mapDispatch(dispatch) {
  return {
    setLoginAuth: (payload) => dispatch(setLoginAuth(payload)),
    setUser: (payload) => dispatch(setUser(payload)),
  };
}
export default connect(mapState, mapDispatch)(Routes);
