import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { user, isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false && user === null ? (
          <Redirect to="/login" />
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
