import React, { useState } from "react";
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";

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
