import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";

export default function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}
