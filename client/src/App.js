import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./components/Routes/Routes";
import { ThemeProvider } from "@material-ui/core";
import { connect } from "react-redux";

const App = ({ config }) => {
  return (
    <ThemeProvider theme={config.theme}>
      <React.Fragment>
        <Router>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Router>
        <ToastContainer />
      </React.Fragment>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ config }) => ({
  config,
});
export default connect(mapStateToProps, null)(App);
