import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Identity from "../identity/Identity";
import NotFound from "../Layout/NotFound";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/identity" component={Identity} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
