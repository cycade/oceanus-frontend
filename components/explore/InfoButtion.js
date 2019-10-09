import { Button, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(3),
    marginTop: theme.spacing(6),
  },
  button: {
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }
}))

export default function InfoButton(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Button href='/recordmap' className={classes.button}>Go to find possums</Button>
    </Paper>
  )
} 