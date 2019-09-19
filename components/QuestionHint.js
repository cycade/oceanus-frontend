import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  hint: {
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  }
}))

export default function QuestionHint(props) {
  const classes = useStyles();
  const content = props.hint === null ? 'No hint here. Try your best!' : props.hint;

  return (
    <div className={classes.root}>
      <Button onClick={props.onClick} variant='outlined' color='primary'>Hint?</Button>
      <div className={classes.hint}>
        {
          props.open
          ? <div className={classes.text}>{content}</div>
          : <div></div>
        }
      </div>
    </div>
  );
}