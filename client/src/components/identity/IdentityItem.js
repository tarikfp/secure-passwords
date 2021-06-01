import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Avatar,
  Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const IdentityItem = ({ onActionClick, identity, setSelectedIdentity }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <LockIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography color="primary" variant="h6">
            {identity.title}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          onClick={(e) => {
            setSelectedIdentity(identity);
            onActionClick(e.currentTarget);
          }}
          edge="end"
          aria-label="delete">
          <MoreVertIcon color="primary" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default IdentityItem;
