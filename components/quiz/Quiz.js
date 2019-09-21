import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

import questions from '../../static/json/questions.js';

import QuizWelcome from './QuizWelcome.js';
import Question from './Question.js';
import QuizResult from './QuizResult.js';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function Quiz(props) {
  const [score, changeScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [quizStatus, setQuizStatus] = useState('welcome');
  
  const classes = useStyles();

  const addScore = function(num) { changeScore(score + num); }
  const getNext = function() {
    if (questionNumber === questions.length - 1) {
      setQuizStatus('QuizEnd');
    } else {
      setQuestionNumber(questionNumber + 1);
    }
  }

  if (quizStatus === 'welcome'){
    return (
      <div className={classes.root}>
         <QuizWelcome onStart={() => setQuizStatus('onProgress')} /> 
      </div>
    )
  } else if (quizStatus === 'onProgress'){
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography variant='h4'>What do you know about me?</Typography>
          <Typography variant='subtitle1'>Your current score: {score}</Typography>
          <Question key={questionNumber+1} num={questionNumber+1} question={questions[questionNumber]} onNext={getNext} onAddScore={addScore}/>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <QuizResult score={score} />
      </div>
    )
  }
}
