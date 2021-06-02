import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Switch,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { login } from "../../actions/auth";
import { setTheme } from "../../actions/config";
import defaultTheme, { DEFAULT_THEME } from "../../theme/DefaultTheme";
import darkTheme, { DARK_THEME } from "../../theme/DarkTheme";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const Copyright = () => {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"Copyright © "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.linkedin.com/in/tarik-pinarci/">
        <Typography variant="body2" color="secondary">
          Tarik Pinarci
        </Typography>
      </a>{" "}
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
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "43%",
    left: "50%",
    marginLeft: -12,
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

const Login = ({ login, setTheme, config }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isDarkTheme, setDarkTheme] = React.useState(
    config.themeName === DARK_THEME,
  );
  const [isLoading, setLoading] = React.useState(false);
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
  const onSubmit = async (data) => {
    setLoading(true);
    await login(data, history);
    setLoading(false);
  };
  const handleThemeChange = () => {
    setDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      setTheme(darkTheme, DARK_THEME);
    } else {
      setTheme(defaultTheme, DEFAULT_THEME);
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
                disabled={isLoading}
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
                disabled={isLoading}
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
            disabled={isLoading}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Login
          </Button>
          {isLoading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
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

const mapStateToProps = ({ config }) => ({
  config,
});

export default connect(mapStateToProps, { login, setTheme })(Login);
