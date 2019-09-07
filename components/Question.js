import { Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

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
    padding: theme.spacing(1),
    width: '30vw',
  },
  rightItem: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '30vw',
    "&:disabled": {
      backgroundColor: "mediumseagreen",
      color: "white",
    },
  },
  selectedItem: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '30vw',
    "&:disabled": {
      borderColor: 'orangered',
      color: 'orangered',
    },
  },
  result: {
    marginTop: theme.spacing(2),
  },
}));

export default function Question(props) {
  const classes = useStyles();
  const [answered, setAnswered] = useState(false);
  const [userChoice, setChoice] = useState(-1);

  const _onAnswer = function(choice, num) {
    if (!answered) {
      props.addScore(num);
      setChoice(choice);
      setAnswered(true);
    }
  }

  const _goNext = function() {
    props.getNext();
    _clearChoice();
  }

  const _getChoiceState = function(key, userChoice) {
    if (userChoice < 0) { return 'default'; }
    if (props.q.items[key].result > 0) {
      return 'correct';
    } else if (userChoice === key) {
      return 'selected';
    } else {
      return 'disabled';
    }
  }

  const _clearChoice = function() {
    setAnswered(false);
    setChoice(-1);
  }

  const _isCorrect = function() {
    if (userChoice < 0 || props.q.items[userChoice].result > 0) { return false; }
    return true;
  }

  return (
    <Paper className={classes.root}>
      {/* render the question */}
      <Typography variant='h6' className={classes.question}>{props.q.question}</Typography>

      {/* render options for the question */}
      <div className={classes.items}>
      {
        props.q.items.map((e, i) => {
          if (_getChoiceState(i, userChoice) === 'correct') {
            return (
              <Button disabled key={i+1} variant='contained' color='primary' className={classes.rightItem}>{e.content}</Button>
            );
          } else if (_getChoiceState(i, userChoice) === 'disabled') {
            return (
              <Button disabled key={i+1} variant='outlined' className={classes.item}>{e.content}</Button>
            )
          } else if (_getChoiceState(i, userChoice) === 'selected') {
            return (
              <Button disabled key={i+1} variant='outlined' className={classes.selectedItem}>{e.content}</Button>
            )
          }
          return (
            <Button focusRipple key={i+1} variant='outlined' onClick={() => _onAnswer(i, e.result)} className={classes.item}>{e.content}</Button>
          )
        })
      }
      </div>

      {/* render the result after answer */}
      {answered
        ? <div className={classes.result}>
          <Typography align='center' variant='subtitle1'>You got {props.q.items[userChoice].result} points</Typography>
          <Button variant='outlined' color='primary' onClick={_goNext}>Go to Next Question</Button>
        </div>
        : <div></div>
      }
    </Paper>
  )
}