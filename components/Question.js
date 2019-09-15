import { Paper, Typography, Button, CardMedia, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import QuestionOption from './QuestionOption.js';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    width: '75vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    paddingBottom: theme.spacing(2),
  },
  items: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  item: {
    margin: theme.spacing(1),
  },
  result: {
    marginTop: theme.spacing(2),
  },
  hint: {
    margin: theme.spacing(2),
  },
}));

export default function Question(props) {
  const classes = useStyles();
  const [userChoice, setChoice] = useState(-1);
  const [hinted, setHint] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setHint(true);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const _handleChoose = function(index) {
    setChoice(index);
    if (index === props.question.answer) {
      if (hinted && props.question.hint !== null) { props.onAddScore(3); }
      else { props.onAddScore(5); }
    }
  }

  const _handleHint = function() {
    setHint(true);
  }
  
  const _handleGetNext = function() {
    _clearChoice();
    props.onNext();
  }

  const _clearChoice = function() {
    setChoice(-1);
    setHint(false);
  }

  const _getChoiceState = function(index) {
    if (userChoice < 0) {
      return 'pending';
    } else if (index === props.question.answer) {
      return 'correct';
    } else if (index === userChoice) {
      return 'selected';
    }
    return 'pending';
  }

  return (
    <Paper className={classes.root}>
      {/* render the question */}
      <Typography variant='h6' className={classes.question}>{props.question.question}</Typography>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Some Hint?
      </Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
        transformOrigin={{ vertical: 'top', horizontal: 'center', }}
      >
        <Typography className={classes.hint}>{props.question.hint || 'Nothing to hint!'}</Typography>
      </Popover>
      {/* <Typography variant='subtitle1' className={classes.question}>{props.question.hint}</Typography> */}

      {/* render options for the question */}
      <div className={classes.items}>
        {
          props.question.items.map((e, i) => 
            <div className={classes.item}>
              <QuestionOption key={i+1}
                bgImage={e.img}
                text={e.text}
                state={_getChoiceState(i)}
                onClick={() => _handleChoose(i)}
              />
            </div>
          )
        }
      </div>

      {/* render the result after answer */}
      {userChoice >= 0
        ? <div className={classes.result}>
          <Button variant='outlined' color='primary' onClick={_handleGetNext}>Go to Next Question</Button>
        </div>
        : <div></div>
      }
    </Paper>
  )
}