import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import Identity from "./identity/Identity";
import PrivateRoute from "./Routes/PrivateRoute";
import NotFound from "../Layout/NotFound";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />

        <PrivateRoute exact path="/identity" component={Identity} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
