import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { loadUser } from "./actions/auth";
import setAuthToken from "./services/auth/setAuthToken";
import Routes from "./components/Routes/Routes";
import Landing from "./components/Layout/Landing";

/* if (localStorage.token) {
  setAuthToken(localStorage.token);
} */
const App = () => {
  /*   React.useEffect(() => {
    store.dispatch(loadUser());
  }, []); */

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={Routes} />
      </Switch>
    </Router>
  );
};

export default App;
