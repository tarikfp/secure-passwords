import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold",
  },
}));

const Landing = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      Landing Page
      <Button variant="contained" onClick={() => history.push("/login")}>
        Login
      </Button>
      <Button variant="contained" onClick={() => history.push("/signup")}>
        Signup
      </Button>
    </div>
  );
};

export default Landing;
