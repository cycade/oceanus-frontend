import { Paper, Typography } from "@material-ui/core";
import { makeStyles }  from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    height: 180,
    background: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  corp: {
    color: '#bbb',
  }
}))

export default function Footer(props) {
  const classes = useStyles();
  return (
    <Paper square className={classes.root}>
      <Typography className={classes.corp} variant='body1'>© 2019 OceanWorld</Typography>
      <Typography className={classes.text} variant='body1'>All rights reserved</Typography>
    </Paper>
  );
}