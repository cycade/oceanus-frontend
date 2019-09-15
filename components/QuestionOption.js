import { makeStyles } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

export default function QuestionOption(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      // width: '32vw',
      // height: '12vw',
      minWidth: 320,
      minHeight: 120,
      border: '1px solid #aaa',
      position: 'relative',
      backgroundImage: `url(../static/img/${props.bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      '&:hover': {
        boxShadow: '0 5px 10px rgba(0,0,0,0.20), 0 6px 18px rgba(0,0,0,0.20)',
        '&::before': {
          // content: "'before'",
        },
      },
    },
    text: {
      color: props.bgImage === null ? 'black' : 'white',
    },
    icon: {
      position: 'absolute',
      opacity: 0.6,
    },
  }));

  const classes = useStyles();

  return (
    <Button className={classes.root} onClick={props.onClick} disabled={props.state !== 'pending'}>
      <Box fontWeight='fontWeightLight' fontSize={24} className={classes.text}>
        {props.text}
      </Box>
      {
        props.state === 'correct'
        ? <FontAwesomeIcon icon={faCheckCircle} color='PaleGreen' transform='grow-120 right-110' className={classes.icon}/>
        : <div></div>
      }
      {
        props.state === 'selected'
        ? <FontAwesomeIcon icon={faTimesCircle} color='Salmon' transform='grow-120 right-110' className={classes.icon}/>
        : <div></div>
      }
    </Button>
  )
}