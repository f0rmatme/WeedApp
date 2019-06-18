import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Toolbar, Typography, Button, IconButton, AppBar} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav(){

    const classes = useStyles();

    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            TokeTalk
          </Typography>
          <Button className={classes.menuButton} color="inherit" aria-label="Menu" href="/">Home</Button>
          <Button className={classes.menuButton} color="inherit" aria-label="Menu" href="/posts/">Posts</Button>
          <Button className={classes.menuButton} color="inherit" aria-label="Menu" href="/theboys/">The Boys</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
    );

}
