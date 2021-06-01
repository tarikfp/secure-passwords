import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import setAuthToken from "../../services/auth/setAuthToken";
import { loadUser } from "../../actions/auth";
import store from "../../store";

const PrivateRoute = ({
  component: Component,
  auth: { user, isAuthenticated },
  ...rest
}) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false && user === null ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, null)(PrivateRoute);
