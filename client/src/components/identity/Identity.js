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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {},
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
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
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
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
}));

const Identity = ({
  auth,
  logout,
  updateIdentity,
  deleteIdentity,
  getAllIdentity,
  identity: { loading: fetchLoading, items },
}) => {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);
  const [selectedIdentity, setSelectedIdentity] = React.useState(null);
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
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            {"User " + auth.user?.name + " " + auth.user?.surname}
          </Typography>

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
          <IconButton onClick={() => getAllIdentity()}>
            <RefreshIcon fontSize="large" color="primary" />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {fetchLoading && <CustomLinearProgress loading={fetchLoading} />}
              <Paper className={classes.paper}>
                <Typography align="center" variant="h6">
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
            updateIdentity={updateIdentity}
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
})(Identity);
