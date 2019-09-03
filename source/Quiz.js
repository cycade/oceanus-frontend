import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Question from './Question.js';

const questions = [
  {
    question: 'What is the capital of Egypt?',
    items: [
      { type: 'text', content: 'Cairo', result: 3},
      { type: 'text', content: 'Budapest', result: 0},
      { type: 'text', content: 'Dili', result: 0},
      { type: 'text', content: 'Dhaka', result: 0},
    ],
    answer: 0,
  },
  {
    question: 'What is the capital of Qatar?',
    items: [
      { type: 'text', content: 'Moroni', result: 0},
      { type: 'text', content: 'Dublin', result: 0},
      { type: 'text', content: 'Doha', result: 3},
      { type: 'text', content: 'Kabul', result: 0},
    ],
    answer: 0,
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finish: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redo: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }
}));

export default function Quiz(props) {
  const [score, changeScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const classes = useStyles();

  const addScore = function(num) { changeScore(score + num); }
  const getNext = function() { setQuestionNumber(questionNumber + 1); }
  const redo = function() {
    setQuestionNumber(0);
    changeScore(0);
  }

  return (
    <div className={classes.root}>
      <Typography variant='h4'>Let's check if you know much about the possum</Typography>
      <Typography variant='subtitle1'>Your current score: {score}</Typography>
      {
        questionNumber < questions.length
        ? <div>
          <Question q={questions[questionNumber]} addScore={addScore} getNext={getNext}/>
        </div>
        : <div className={classes.finish}>
            <Typography variant='h5'>Finished!</Typography>
            <Button className={classes.redo} variant='outlined' onClick={redo}>Redo the quiz!</Button>
          </div>
      }
    </div>
  )
}