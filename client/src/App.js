import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { loadUser } from "./actions/auth";
import setAuthToken from "./services/auth/setAuthToken";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./components/Routes/Routes";
import Landing from "./components/Layout/Landing";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
