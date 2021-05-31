import React from "react";
import {
  Button,
  TextField,
  Popover,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { updateIdentity } from "../../actions/identity";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
}));

const useCreateIdentityFormValidation = () => {
  const formValidationRequiredMessage = "Required Field";
  const passwordLengthValidMessage = "Password must be at least 6 length";
  return yup.object().shape({
    title: yup.string().required(formValidationRequiredMessage),
    password: yup
      .string()
      .required(formValidationRequiredMessage)
      .min(5, passwordLengthValidMessage),
  });
};

const IdentityEditPopover = ({
  anchorEl,
  handleClose,
  selectedIdentity,
  updateIdentity,
}) => {
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const schema = useCreateIdentityFormValidation();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);
  const onSubmit = (data) => {
    data.id = selectedIdentity._id;
    data.salt = selectedIdentity.salt;
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
        <Typography align="center" variant="h6">
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
