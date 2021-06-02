import React from "react";
import {
  Button,
  TextField,
  Popover,
  makeStyles,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordStrengthBar from "react-password-strength-bar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import CommentIcon from "@material-ui/icons/Comment";
import LanguageIcon from "@material-ui/icons/Language";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: 450,
    padding: theme.spacing(5),
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
    password: yup
      .string()
      .required(formValidationRequiredMessage)
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        strongPasswordValidationMessage,
      ),
  });
};

const IdentityEditPopover = ({
  anchorEl,
  handleClose,
  selectedIdentity,
  updateIdentity,
}) => {
  const classes = useStyles();
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const schema = useCreateIdentityFormValidation();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      password: "",
    },
    shouldUnregister: false,
  });
  React.useEffect(() => {
    if (anchorEl !== null) {
      setValue("title", selectedIdentity.title);
      setValue("password", selectedIdentity.password);
      setValue("website", selectedIdentity.website);
      setValue("note", selectedIdentity.note);
    }
    if (anchorEl === null) {
      reset();
      setPasswordVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);
  const onSubmit = (data) => {
    data.id = selectedIdentity._id;
    updateIdentity(data);
    reset();
    handleClose();
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}>
      <div className={classes.content}>
        <Typography color="primary" align="center" variant="h6">
          Update your identity
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="_title"
                label="Your Item Title"
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
                label="Website Url"
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
                        onClick={() => setPasswordVisible(!isPasswordVisible)}>
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
            Update Identity
          </Button>
          <Button
            fullWidth
            className={classes.cancelButton}
            onClick={() => handleClose()}
            variant="contained"
            color="secondary">
            Cancel
          </Button>
        </form>
      </div>
    </Popover>
  );
};
export default IdentityEditPopover;
