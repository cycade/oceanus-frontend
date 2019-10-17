import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
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
}))

function getResult(score) { 
    if (score >= 25) { 
        return `Well done! Your score is ${score}/30, you are a knowledgeable Leadbeater's Possum lover`; 
    } else if (score >= 13) { 
        return `Good job! Your score is ${score}/30. You can learn more from our website.`; 
    } else { 
        return `Finally finished! Your score is ${score}/30. You’ve got a lot to learn.`; 
    } 
} 

export default function QuizResult(props) {
    const classes = useStyles();
    
    return (
        <div className={classes.finish}>
        <Typography variant='h5'>Score: {props.score}</Typography>
        <Typography variant='h5'> {getResult(props.score)}</Typography>
        <Button className={classes.redo} variant='contained' color='primary' href='/news'>Read More</Button>
        {
          props.score > 25
          ? <Button className={classes.redo} variant='contained' href='/recordmap'>Go to find them</Button>
          : <div></div>
        }
      </div>
    );
}