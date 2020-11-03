import React, { useState } from "react";
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import ProfileEdit from "./profile-edit";

export default function App() {
  return (
    <Router>
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
    </Router>
  );
}
