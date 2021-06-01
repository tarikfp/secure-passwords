import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography align="center" variant="h3">
        404 Not Found
        <br />
        <br />
        <Link to="/"> Go to home page </Link>
      </Typography>
    </div>
  );
};

export default NotFound;
