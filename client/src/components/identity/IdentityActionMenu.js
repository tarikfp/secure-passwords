import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const IdentityActionMenu = ({
  handlePopoverOpen,
  anchorEl,
  handleClose,
  selectedIdentity,
  updateIdentity,
  deleteIdentity,
}) => {
  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}>
      <StyledMenuItem
        onClick={(e) => {
          handlePopoverOpen(e.currentTarget);
          handleClose();
        }}>
        <ListItemIcon>
          <SendIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit Identity" />
      </StyledMenuItem>
      <StyledMenuItem
        onClick={() => {
          handleClose();
          deleteIdentity(selectedIdentity._id);
        }}>
        <ListItemIcon>
          <DraftsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Delete Identity" />
      </StyledMenuItem>
    </StyledMenu>
  );
};

export default IdentityActionMenu;
