import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import {useState} from 'react';

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
  const [open, setOpen] = useState(false);
  const [showHint, setHint] = useState(false);

  function handleTooltipClose() {
    setOpen(false);
  }

  function handleTooltipOpen() {
    setOpen(true);
  }

  function handleHintClick(event) {
    props.onClick(event);
    setHint(!showHint);
  }

  return (
    <div className={classes.root}>
      <Tooltip onClose={handleTooltipClose} onOpen={handleTooltipOpen} open={open} title="Get Some Hint?">
        <Button onClick={handleHintClick} variant='outlined' color='primary'>Hint?</Button>
      </Tooltip>
      <div className={classes.hint}>
        {
          showHint || props.finished
          ? <div className={classes.text}>{content}</div>
          : <div></div>
        }
      </div>
    </div>
  );
}