import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Hidden } from '@material-ui/core';
import Image from '../static/img/B001.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    minHeight: '60vh',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    paddingTop: theme.spacing(9),
    color: 'white',
  },
  text: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),  
  },
}));

export default function Banner(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root} square={true}>
      <Grid container justify='center'>
        <Grid item className={classes.title}>
          <Hidden smDown>
            <Typography align='center' variant='h2' className={classes.text}>Leadbeater's Possum</Typography>
            <Typography align='center' className={classes.text}>The only member of the genus Gymnobelideus and wild populations are confined to Victoria.</Typography>
          </Hidden>
          <Hidden mdUp>
            <Typography align='center' variant='h3' className={classes.text}>Leadbeater's Possum</Typography>
            <Typography align='center' className={classes.text}>The only member of the genus Gymnobelideus and wild populations are confined to Victoria.</Typography>
          </Hidden>
        </Grid>
      </Grid>
    </Paper>
  )
}