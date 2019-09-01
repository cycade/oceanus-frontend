import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
        marginLeft: theme.spacing(3),
    },
}));

export default function NavigationBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static' style={{  }}>
                <Toolbar>
                    <Typography variant='h5' className={classes.title}>Possum Nest</Typography>
                    <Button color='inherit'>Distribution Map</Button>
                    <Button color='inherit'>Clustering Map</Button>
                    <Button color='inherit'>News</Button>
                    <Button color='inherit' variant='outlined' className={classes.button}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
