import { Paper, Typography, Button, Tooltip } from '@material-ui/core';
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
    width: '30vw',
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
      console.log(`You choose ${choice}`);
      setAnswered(true);
    }
  }

  const _goNext = function() {
    props.getNext();
    _clearChoice();
  }

  const _getChoiceState = function(key, userChoice) {
    if (userChoice < 0) { return 'default'; }
    if (userChoice === key) {
      return 'selected';
    } else {
      return 'disabled';
    }
  }

  const _clearChoice = function() {
    setAnswered(false);
    setChoice(-1);
  }

  return (
    <Paper className={classes.root}>
      <Typography variant='h6' className={classes.question}>{props.q.question}</Typography>
      <div className={classes.items}>
      {
        props.q.items.map((e, i) => {
          if (_getChoiceState(i, userChoice) === 'selected') {
            return (
              <Tooltip key={i+1} disableHoverListener title='item'>
                <Button variant='outlined' color='primary' onClick={() => _onAnswer(i, e.result)} className={classes.item}>{e.content}</Button>
              </Tooltip>
            )
          } else if (_getChoiceState(i, userChoice) === 'disabled') {
            return (
              <Tooltip key={i+1} disableHoverListener title='item'>
                <Button variant='outlined' disabled onClick={() => _onAnswer(i, e.result)} className={classes.item}>{e.content}</Button>
              </Tooltip>
            )
          }
          return (
          <Tooltip key={i+1} disableHoverListener title='item'>
            <Button variant='outlined' onClick={() => _onAnswer(i, e.result)} className={classes.item}>{e.content}</Button>
          </Tooltip>
          )
        })
      }
      {answered
        ? <div>
          <Typography align='center' variant='subtitle1'>You got {props.q.items[userChoice].result} points</Typography>
          <Button onClick={_goNext}>Go to Next Question</Button>
        </div>
        : <div></div>
      }
      </div>
    </Paper>
  )
}