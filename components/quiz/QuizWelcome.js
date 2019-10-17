import { Box, Button, Paper, makeStyles, Typography } from "@material-ui/core";
import Head from 'next/head';

const description = [
  "There are totally 6 questions and each question is worth 5 marks.",
  " The total marks for all questions in the quiz are 30 marks.",
  "There are some hints for each question.",
  " If you get the right answer based on the hint, you will get 3 marks for this question.",
];

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '30vh',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    width: '65vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  start: {
    fontWeight: 500,
    margin: theme.spacing(2),
  },
  description: {

  }
}))

export default function QuizWelcome(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        {
          description.map((e, i) => (
            <Typography key={i} variant='h5' className={classes.description} align='center'>{e}</Typography>
          ))
        }
        <Typography variant='h5' className={classes.start} align='center'>Let's get start!</Typography>
        <Button variant='contained' onClick={props.onStart} color='primary'>Attemp Quiz</Button>
      </Paper>
    </div>
  )
}