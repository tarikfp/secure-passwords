import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { login } from "../../actions/auth";
import { setTheme } from "../../actions/config";
import defaultTheme from "../../theme/DefaultTheme";
import darkTheme from "../../theme/DarkTheme";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const Copyright = () => {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://www.linkedin.com/in/tarik-pinarci/">
        <Typography variant="body2" color="secondary">
          Tarik Pinarci
        </Typography>
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signupNavigationLink: {
    textDecoration: "none",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `${theme.palette.primary.main} !important`,
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const useLoginFormValidation = () => {
  const formValidationRequiredMessage = "Required Field";
  const emailValidMessage = "Invalid Email";
  const passwordLengthValidMessage = "Password must be at least 6 length";
  return yup.object().shape({
    email: yup
      .string()
      .required(formValidationRequiredMessage)
      .email(emailValidMessage),
    password: yup
      .string()
      .required(formValidationRequiredMessage)
      .min(5, passwordLengthValidMessage),
  });
};

const Login = ({ login, setTheme }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isDarkTheme, setDarkTheme] = React.useState(false);
  const schema = useLoginFormValidation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => login(data, history);
  const handleThemeChange = () => {
    setDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(defaultTheme);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <VpnKeyIcon fontSize="large" className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={errors.email?.message}
                error={!!errors.email?.message}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                helperText={errors.password?.message}
                error={!!errors.password?.message}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                autoFocus
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Login
          </Button>
          <div className={classes.bottom}>
            <Link to="/signup" className={classes.signupNavigationLink}>
              <Typography variant="body2" color="primary">
                Don't have an account? Sign Up
              </Typography>
            </Link>
            <div>
              <Brightness4Icon />
              <Switch
                checked={isDarkTheme}
                onChange={handleThemeChange}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default connect(null, { login, setTheme })(Login);
