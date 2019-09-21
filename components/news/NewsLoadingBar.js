import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  loadingBar: {
    margin: theme.spacing(8),
  },
}))

export default function NewsLoadingBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.loadingBar}>
      <Typography variant='subtitle2' align='center' color='secondary'>Searching News for you</Typography>
      <LinearProgress color='primary'/>
    </div>
  );
}