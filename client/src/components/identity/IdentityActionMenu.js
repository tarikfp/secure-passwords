import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const IdentityActionMenu = ({
  handlePopoverOpen,
  anchorEl,
  handleClose,
  selectedIdentity,
  deleteIdentity,
}) => {
  const classes = useStyles();
  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}>
      <div className={classes.content}>
        <MenuItem
          onClick={(e) => {
            handlePopoverOpen(e.currentTarget);
            handleClose();
          }}>
          <ListItemIcon>
            <EditIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText color="primary" primary="Edit Identity" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            deleteIdentity(selectedIdentity._id);
          }}>
          <ListItemIcon>
            <DeleteIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText color="primary" primary="Delete Identity" />
        </MenuItem>
      </div>
    </StyledMenu>
  );
};

export default IdentityActionMenu;
