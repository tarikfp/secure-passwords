import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Paper,
  List,
  Switch,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import {
  updateIdentity,
  deleteIdentity,
  getAllIdentity,
} from "../../actions/identity";
import IdentityItem from "./IdentityItem";
import CreateIdentityCard from "./CreateIdentityCard";
import { CustomLinearProgress } from "../Layout/Progress";
import IdentityActionMenu from "./IdentityActionMenu";
import RefreshIcon from "@material-ui/icons/Refresh";
import IdentityEditPopover from "./IdentityEditPopover";
import { setTheme } from "../../actions/config";
import darkTheme from "../../theme/DarkTheme/index";
import defaultTheme from "../../theme/DefaultTheme";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    maxHeight: 550,
  },
  logoutText: {
    marginRight: theme.spacing(3),
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

const Identity = ({
  auth,
  logout,
  updateIdentity,
  deleteIdentity,
  getAllIdentity,
  setTheme,
  identity: { loading: fetchLoading, items },
}) => {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);
  const [selectedIdentity, setSelectedIdentity] = React.useState(null);
  const [isDarkTheme, setDarkTheme] = React.useState(false);
  React.useEffect(() => {
    getAllIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleMenuOpen = (target) => {
    setMenuAnchorEl(target);
  };
  const handlePopoverOpen = (target) => {
    setPopoverAnchorEl(target);
  };
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };
  const handleThemeChange = () => {
    setDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(defaultTheme);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            My Identities
          </Typography>
          <AccountCircleIcon />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            {auth.user?.name && auth.user?.surname
              ? "User " + auth.user?.name + " " + auth.user?.surname
              : ""}
          </Typography>
          <Brightness4Icon />
          <Switch
            checked={isDarkTheme}
            onChange={handleThemeChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <IconButton onClick={() => logout()} color="inherit">
            <Typography className={classes.logoutText} variant="h6">
              Logout
            </Typography>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <IconButton onClick={() => getAllIdentity(true)}>
            <RefreshIcon fontSize="large" color="primary" />
            <Typography color="primary" variant="h6">
              Refresh
            </Typography>
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {fetchLoading && <CustomLinearProgress loading={fetchLoading} />}
              <Paper className={classes.paper}>
                <Typography color="primary" align="center" variant="h6">
                  Your Current Identities
                </Typography>
                <div>
                  <List>
                    {items &&
                      items.map((item) => (
                        <IdentityItem
                          key={item._id}
                          setSelectedIdentity={setSelectedIdentity}
                          onActionClick={handleMenuOpen}
                          identity={item}
                        />
                      ))}
                  </List>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <CreateIdentityCard />
            </Grid>
          </Grid>
          <IdentityActionMenu
            deleteIdentity={deleteIdentity}
            anchorEl={menuAnchorEl}
            handlePopoverOpen={handlePopoverOpen}
            selectedIdentity={selectedIdentity}
            handleClose={handleMenuClose}
          />
          <IdentityEditPopover
            selectedIdentity={selectedIdentity}
            anchorEl={popoverAnchorEl}
            handleClose={handlePopoverClose}
            updateIdentity={updateIdentity}
          />
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = ({ auth, identity }) => ({
  auth,
  identity,
});

export default connect(mapStateToProps, {
  logout,
  getAllIdentity,
  deleteIdentity,
  updateIdentity,
  setTheme,
})(Identity);
