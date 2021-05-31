import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Collapse,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { createIdentity } from "../../actions/identity";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 500,
  },
  form: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  submitButton: {
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(3),
  },
  cancelButton: {
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },
}));

const useCreateIdentityFormValidation = () => {
  const formValidationRequiredMessage = "Required Field";
  const passwordLengthValidMessage =
    "Your Identity Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";
  return yup.object().shape({
    title: yup.string().required(formValidationRequiredMessage),
    password: yup
      .string()
      .required(formValidationRequiredMessage)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        passwordLengthValidMessage,
      ),
  });
};

const CreateIdentityCard = ({ createIdentity }) => {
  const classes = useStyles();
  const schema = useCreateIdentityFormValidation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      password: "",
    },
  });
  const [expanded, setExpanded] = React.useState(false);
  React.useEffect(() => {
    if (!expanded) {
      // Clear form when card is closed
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const onSubmit = (data) => {
    createIdentity(data);
    reset();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<VpnKeyIcon color="primary" />}
        action={
          <IconButton onClick={handleExpandClick} aria-label="settings">
            <AddCircleIcon color="secondary" />
          </IconButton>
        }
        title={<Typography variant="h6">Create Your Identity</Typography>}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="title"
                  label="Your Item Title"
                  name="title"
                  autoComplete="title"
                  helperText={errors.title?.message}
                  error={!!errors.title?.message}
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
                  autoFocus
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              className={classes.submitButton}
              variant="contained"
              color="primary">
              Create Identity
            </Button>
            <Button
              fullWidth
              className={classes.cancelButton}
              onClick={() => setExpanded(false)}
              variant="contained"
              color="secondary">
              Cancel
            </Button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default connect(null, { createIdentity })(CreateIdentityCard);
