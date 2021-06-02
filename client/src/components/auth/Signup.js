import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Switch,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { signup } from "../../actions/auth/index";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import darkTheme, { DARK_THEME } from "../../theme/DarkTheme";
import defaultTheme, { DEFAULT_THEME } from "../../theme/DefaultTheme";
import { setTheme } from "../../actions/config";

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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginNavigationLink: {
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const useSignupFormValidation = () => {
  const formValidationRequiredMessage = "Required Field";
  const emailValidMessage = "Invalid Email";
  const passwordLengthValidMessage = "Password must be at least 6 length";
  return yup.object().shape({
    name: yup.string().required(formValidationRequiredMessage),
    surname: yup.string().required(formValidationRequiredMessage),
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

const Signup = ({ signup, setTheme, config }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isDarkTheme, setDarkTheme] = React.useState(
    config.themeName === DARK_THEME,
  );
  const [isLoading, setLoading] = React.useState(false);
  const schema = useSignupFormValidation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    setLoading(true);
    signup(data, history);
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
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="primary" />
        </Backdrop>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Your Name"
                name="name"
                autoComplete="email"
                helperText={errors.name?.message}
                error={!!errors.name?.message}
                autoFocus
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="surname"
            render={({ field }) => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="surname"
                label="Your Surname"
                name="surname"
                autoComplete="surname"
                helperText={errors.surname?.message}
                error={!!errors.surname?.message}
                autoFocus
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                {...field}
              />
            )}
          />
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
                autoFocus
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
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
                id="password"
                type="password"
                label="Password"
                name="password"
                autoComplete="password"
                helperText={errors.password?.message}
                error={!!errors.password?.message}
                autoFocus
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
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
            Signup
          </Button>
          <div className={classes.bottom}>
            <Link to="/" className={classes.loginNavigationLink}>
              <Typography variant="body2" color="primary">
                Already have an account ? Login
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

export default connect(mapStateToProps, { signup, setTheme })(Signup);
