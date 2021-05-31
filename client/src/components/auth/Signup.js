import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { signup } from "../../actions/auth/index";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright ©"}
      <Link color="inherit" href="https://www.linkedin.com/in/tarik-pinarci/">
        Tarik Pinarci
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
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

const Signup = (props) => {
  const classes = useStyles();
  const history = useHistory();
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
    debugger;
    props.signup(data, history);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
                label="Password"
                name="password"
                autoComplete="password"
                helperText={errors.password?.message}
                error={!!errors.password?.message}
                autoFocus
                {...field}
              />
            )}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Signup
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login" className={classes.loginNavigationLink}>
                {"Already have an account ? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default connect(null, { signup })(Signup);
