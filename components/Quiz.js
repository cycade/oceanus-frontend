import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Question from './Question.js';

const questions = [
  {
    question: 'The following which one is the Leadbeater’s Possum?',
    hint: 'Leadbeater’s possums are grey to greyish-brown above and paler below with a dark mid-dorsal (along centre of back) stripe.',
    items: [
      {img: 'Q1A.jpg', text: null },
      {img: 'Q1B.jpg', text: null },
      {img: 'Q1C.jpg', text: null },
      {img: 'Q1D.jpg', text: null },
    ],
    answer: 0,
  },
  {
    question: 'What one is not Leadbeater’s Possum Diet?',
    hint: 'Its primary diet consists of insects such as spiders, beetles, crickets. It also licks off the leaves of trees, enjoys the gum, nectar and sap of wattle trees and eucalyptus trees.',
    items: [
      {img: 'Q2A.jpg', text: 'Fern' },
      {img: 'Q2B.jpg', text: 'Beetles' },
      {img: 'Q2C.jpg', text: 'Cricket' },
      {img: 'Q2D.jpg', text: 'Eucalyptus leaves "honey dew"' },
    ],
    answer: 0,
  },
  {
    question: 'Which one is not a threat to the Leadbeater\'s possum?',
    hint: 'The greatest threats to conservation in the wild are logging, low habitats protection, bush fire and predator threats.',
    items: [
      {img: 'Q3A.jpg', text: 'Feral cat' },
      {img: 'Q3B.jpg', text: 'Bushfire' },
      {img: 'Q3C.jpg', text: 'Arid landscape' },
      {img: 'Q3D.jpg', text: 'Logging' },
    ],
    answer: 2,
  },
  {
    question: 'Which one is not the suitable living condition for Leadbeater\'s possums?',
    hint: 'Leadbeater’s Possums prefer the hollows of dead trees over those of live ones. This may be because dead tree hollows are less damp and better drained than those if live trees.',
    items: [
      {img: null, text: 'Old-growth tree over 150 years' },
      {img: null, text: 'Dead tree hollows' },
      {img: null, text: 'Damp hollows environment' },
      {img: null, text: 'Dense vegetation environment' },
    ],
    answer: 2,
  },
  {
    question: 'Which one cannot provide efficient conservation for Leadbeater\'s possums?',
    hint: 'Forest must be neither too old nor too young, with conservation efforts for Leadbeater\'s possum involving protection of remaining old-growth stands, and maintenance of younger stands that are allowed to attain hollow-bearing age.',
    items: [
      {img: 'Q5A.jpg', text: 'Saplings planting' },
      {img: 'Q5B.jpg', text: 'Nest box settlement' },
      {img: 'Q5C.jpg', text: 'Captive breeding program' },
      {img: 'Q5D.jpg', text: 'Feral cats reporting' },
    ],
    answer: 0,
  },
  {
    question: 'Which fact is not correct?',
    hint: null,
    items: [
      {img: null, text: 'By the time of the 1939 Black Friday fires, the species was thought to have been extinct.' },
      {img: null, text: 'They live in small family colonies of up to 12 individuals.' },
      {img: null, text: 'Mating occurs only once a year, with a maximum of two joeys being born to each pair.' },
      {img: null, text: 'Polygamy breeding pair.' },
    ],
    answer: 3,
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
  )
}