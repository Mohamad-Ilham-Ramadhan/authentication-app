import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import ProfileEdit from "./profile-edit";

export default function Routes({}) {
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
