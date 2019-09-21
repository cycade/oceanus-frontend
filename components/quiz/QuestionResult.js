import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  "@keyframes showScore": {
    '0%': {
      transform: 'scale(2)',
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    }
  },
  root: {
    animationName: '$showScore',
    animationDuration: '0.8s',
    opacity: 1,
    position: 'absolute',
    top: '100px',
    right: '50px',
    height: '89px',
    width: '89px',
    transfrom: 'rotate(30deg)',
    backgroundImage: 'url(../static/img/certificate.svg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2.5),
    color: 'white',
  },
}))

export default function QuestionResult(props) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant='h3' className={classes.root}>+{props.value}</Typography>
    </div>
  );
}