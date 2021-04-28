import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Main } from "./App";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="*" component={Main} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
