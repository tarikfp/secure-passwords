import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import { loadUser } from "./actions/auth";
import setAuthToken from "./services/auth/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <ToastContainer>
      <Layout />
    </ToastContainer>
  );
};

export default App;
