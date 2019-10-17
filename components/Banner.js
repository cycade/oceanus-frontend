import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Hidden } from '@material-ui/core';
import Image from '../static/img/B002.jpg';

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
    clipPath: "ellipse(110% 85% at 50% 15%)"
  },
  text: {
    paddingTop: theme.spacing(9),
    color: 'white',
  },
  title: {
    fontWeight: 600,
    margin: theme.spacing(1),
  },
  desc: {
    fontWeight: 300,
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),  
  },
}));

export default function Banner(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root} square={true}>
      <div className={classes.text}>
        <Hidden smDown>
          <Typography align='center' variant='h2' className={classes.title}>Leadbeater's Possum</Typography>
          <Typography align='center' variant='h4' className={classes.desc}>Join us to protect this species which only exist about 2000 all over the world</Typography>
        </Hidden>
        <Hidden mdUp>
          <Typography align='center' variant='h4' className={classes.title}>Leadbeater's Possum</Typography>
          <Typography align='center' variant='h6' className={classes.desc}>Join us to protect this species which only exist about 2000 all over the world</Typography>
        </Hidden>
      </div>
    </Paper>
  )
}