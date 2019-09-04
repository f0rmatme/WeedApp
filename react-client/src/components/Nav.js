import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  makeStyles,
  Toolbar,
  Typography,
  Button,
  IconButton,
  AppBar
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "white"
  }
}));

const Nav = props => {
  const handleLogout = () => {
    localStorage.clear();
    props.setAt("");
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#8C5434" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TokeTalk
          </Typography>
          <Button
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={props.posts}
          >
            Posts
          </Button>
          <Button
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={props.weed}
          >
            Weed
          </Button>
          <Button
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={props.theboys}
          >
            The Boys
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
