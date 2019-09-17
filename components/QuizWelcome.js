import { Box, Button, Paper, makeStyles, Typography } from "@material-ui/core";
import Head from 'next/head';

const description = [
  "There are total 6 quesitons.",
  "Each question equals 5 marks.",
  "There are some hints for each question.",
  "If you get right answer based on the hint, you will get 3 marks for this question.",
  "Good luck for your quiz.",
].join(' ');

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
  description: {
    margin: theme.spacing(2),
    fontFamily: 'Convergence',
  }
}))

export default function QuizWelcome(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Convergence' rel='stylesheet' type='text/css' />
      </Head>

      <Paper className={classes.content}>
        <Typography variant='h5' className={classes.description} align='center'>{description}</Typography>
        <Button variant='contained' onClick={props.onStart} color='primary'>Attemp Quiz</Button>
      </Paper>
    </div>
  )
}