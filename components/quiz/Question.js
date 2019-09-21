import { Paper, Typography, Button, CardMedia, Popover, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import QuestionOption from './QuestionOption.js';
import QuestionHint from './QuestionHint.js';
import QuestionResult from './QuestionResult.js';

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
    position: 'relative',
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
  const [score, setScore] = useState(0);
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
      if (hinted && props.question.hint !== null) { props.onAddScore(3); setScore(3); }
      else { props.onAddScore(5); setScore(5); }
    }
    setAnchorEl(event.currentTarget);

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
      return 'wrong';
    }
    return 'selected';
  }

  return (
    <Paper className={classes.root}>
      {/* render the question */}
      <Typography variant='h6' className={classes.question}>{props.question.question}</Typography>
      {
        userChoice >= 0
        ? <QuestionResult value={score} />
        : <div></div>
      }
      <QuestionHint open={open} onClick={handleClick} hint={props.question.hint} />

      {/* render options for the question */}
      <div className={classes.items}>
        <Grid container>
        {
          props.question.items.map((e, i) => 
            <Grid item md={6} xs={12} spacing={3} key={i+1}>
              <QuestionOption key={i+1}
                bgImage={e.img}
                text={e.text}
                state={_getChoiceState(i)}
                onClick={() => _handleChoose(i)}
              />
            </Grid>
          )
        }
        </Grid>
      </div>


      {/* render the result after answer */}
      {userChoice >= 0
        ? <div className={classes.result}>
          <Button variant='contained' color='primary' onClick={_handleGetNext}>
            {props.num === 6 ? 'Show result' : 'Go to Next Question'}
          </Button>
        </div>
        : <div></div>
      }
    </Paper>
  )
}