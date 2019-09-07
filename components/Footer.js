import { Paper, Typography } from "@material-ui/core";
import { makeStyles }  from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    height: 180,
    background: '#435749',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
}))

export default function Footer(props) {
  const classes = useStyles();
  return (
    <Paper square className={classes.root}>
      <Typography className={classes.text} variant='h6'>Build by OceanWorld</Typography>
      <Typography className={classes.text} variant='body1'>All rights reserved</Typography>
    </Paper>
  );
}