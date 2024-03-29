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
  InputAdornment,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { createIdentity } from "../../actions/identity";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import PasswordStrengthBar from "react-password-strength-bar";
import CommentIcon from "@material-ui/icons/Comment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LanguageIcon from "@material-ui/icons/Language";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 345,
    maxHeight: 600,
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
}));

const useCreateIdentityFormValidation = () => {
  const formValidationRequiredMessage = "Required Field";
  const strongPasswordValidationMessage =
    "Your identity password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
  return yup.object().shape({
    title: yup.string().required(formValidationRequiredMessage),
    website: yup.string().required(formValidationRequiredMessage),
    note: yup.string(),
    password: yup
      .string()
      .required(formValidationRequiredMessage)
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        strongPasswordValidationMessage,
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
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      website: "",
      note: "",
      password: "",
    },
  });
  const [expanded, setExpanded] = React.useState(false);
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
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
        title={
          <Typography color="primary" variant="h6">
            Create New Identity
          </Typography>
        }
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
                  id="_title"
                  label="Your Identity Title"
                  name="title"
                  autoComplete="title"
                  helperText={errors.title?.message}
                  error={!!errors.title?.message}
                  autoFocus
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <NoteAddIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="website"
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="website"
                  label="Your Website URL"
                  name="website"
                  autoComplete="website"
                  helperText={errors.website?.message}
                  error={!!errors.website?.message}
                  autoFocus
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <LanguageIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="note"
                  label="Your Identity Note"
                  name="note"
                  autoComplete="note"
                  helperText={errors.note?.message}
                  error={!!errors.note?.message}
                  autoFocus
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <CommentIcon color="primary" />
                      </InputAdornment>
                    ),
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
                  type={!isPasswordVisible ? "password" : "text"}
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  helperText={errors.password?.message}
                  error={!!errors.password?.message}
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setPasswordVisible(!isPasswordVisible)
                          }>
                          {isPasswordVisible ? (
                            <VisibilityIcon color="primary" />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon color="primary" />
                      </InputAdornment>
                    ),
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
            <PasswordStrengthBar minLength={6} password={watch("password")} />
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
