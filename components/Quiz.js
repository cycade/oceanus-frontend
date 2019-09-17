import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

import questions from '../static/json/questions.js';

import QuizWelcome from './QuizWelcome.js';
import Question from './Question.js';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
  content: {
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
  const [quizStatus, setQuizStatus] = useState('welcome');

  const classes = useStyles();

  const addScore = function(num) { changeScore(score + num); }
  const getNext = function() { setQuestionNumber(questionNumber + 1); }
  const redo = function() {
    setQuestionNumber(0);
    changeScore(0);
  }
  const _getResult = function() {
    if (score >= 25) {
      return `Well done! Your score is ${score}/30, you are a knowledgeable Leadbeater's Possum lover`;
    } else if (score >= 13) {
      return `Good job! Your score is ${score}/30. You can learn more from our website.`;
    } else {
      return `Finally finished! Your score is ${score}/30. You’ve got a lot to learn.`;
    }
  }

  return (
    <div className={classes.root}>
      {
        quizStatus === 'welcome'
        ? <QuizWelcome onStart={() => setQuizStatus('onProgress')} />
        : <div className={classes.content}>
          <Typography variant='h4'>What do you know about me?</Typography>
          <Typography variant='subtitle1'>Your current score: {score}</Typography>
          {
            questionNumber < questions.length
            ? <div>
              <Question key={questionNumber+1} num={questionNumber+1} question={questions[questionNumber]} onNext={getNext} onAddScore={addScore}/>
            </div>
            : <div className={classes.finish}>
                <Typography variant='h5'>{_getResult()}</Typography>
                <Button className={classes.redo} variant='outlined' href='/news'>Read More</Button>
                {
                  score > 25
                  ? <Button className={classes.redo} variant='outlined' href='/recordmap'>Go to find them</Button>
                  : <div></div>
                }
                {/* <Button className={classes.redo} variant='outlined' onClick={redo}>Redo the quiz!</Button> */}
              </div>
          }
        </div>
      }
    </div>
  )
}