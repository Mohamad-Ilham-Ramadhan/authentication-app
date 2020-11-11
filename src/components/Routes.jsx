import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import ProfileEdit from "./profile-edit";

// test
import firebase, { database } from "../config/firebase/index";
import store from "../config/redux/store";
// actions
import setLoginAuth from "../config/redux/actions/setLoginAuth";
import setUser from "../config/redux/actions/setUser";
import setFirstMount from "../config/redux/actions/setFirstMount";
import setUserLoading from "../config/redux/actions/setUserLoading";

function Routes({
  isLogin,
  uid,
  setLoginAuth,
  setUser,
  setFirstMount,
  firstMount,
}) {
  const history = useHistory();

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
    firstMount: state.firstMount,
  };
}
function mapDispatch(dispatch) {
  return {
    setLoginAuth: (payload) => dispatch(setLoginAuth(payload)),
    setUser: (payload) => dispatch(setUser(payload)),
    setFirstMount: (payload) => dispatch(setFirstMount(payload)),
  };
}
export default connect(mapState, mapDispatch)(Routes);
