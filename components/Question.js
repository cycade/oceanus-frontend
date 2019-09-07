import { Paper, Typography, Button, CardMedia, Popover } from '@material-ui/core';
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
    padding: theme.spacing(1),
    width: '30vw',
  },
  imageItem: {
    width: '20vw',
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  },
  rightItem: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '30vw',
    "&:disabled": {
      backgroundColor: "mediumseagreen",
      color: "white",
    },
  },
  choicedItem: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '30vw',
    borderColor: 'SlateBlue',
  },
  selectedItem: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '30vw',
    "&:disabled": {
      borderColor: 'orangered',
      color: 'orangered',
    },
  },
  result: {
    marginTop: theme.spacing(2),
  },
  hint: {
    margin: theme.spacing(2),
  },
}));

export default function Question(props) {
  const classes = useStyles();
  const [userChoice, setChoice] = useState(-1);
  const [hinted, setHint] = useState(false);
  const [submitted, setSubmit] = useState(false);



  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setHint(true);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  const _handleChoice = function(choice) {
    setChoice(choice);
  }

  const _handleHint = function() {
    setHint(true);
  }

  const _handleSubmit = function(choice) {
    setSubmit(true);
    if (_isCorrect()) {
      if (hinted) { props.onAddScore(3); } else { props.onAddScore(5); }
    }
  }
  
  const _handleGetNext = function() {
    _clearChoice();
    props.onNext();
  }

  const _clearChoice = function() {
    setChoice(-1);
    setHint(false);
    setSubmit(false);
  }

  const _isCorrect = function() {
    return userChoice === props.question.answer;
  }

  const _getChoiceState = function(index) {
    if (index === props.question.answer) {
      return 'correct';
    } else if (index === userChoice) {
      return 'selected';
    }
    return 'disabled';
  }

  return (
    <Paper className={classes.root}>
      {/* render the question */}
      <Typography variant='h6' className={classes.question}>{props.question.question}</Typography>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Get some Hint!
      </Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
        transformOrigin={{ vertical: 'top', horizontal: 'center', }}
      >
        <Typography className={classes.hint}>{props.question.hint}</Typography>
      </Popover>
      {/* <Typography variant='subtitle1' className={classes.question}>{props.question.hint}</Typography> */}

      {/* render options for the question */}
      <div className={classes.items}>
      {
        props.question.items.map((e, i) => {
          if (submitted) {
            if (_getChoiceState(i, userChoice) === 'correct') {
              return (
                <Button disabled key={i+1} variant='contained' color='primary' className={classes.rightItem}>
                  {
                    e.img !== null 
                    ?<CardMedia className={classes.imageItem} image={`../static/img/${e.img}`} title="Contemplative Reptile" />
                    : <div></div>
                  }
                  <Typography>{e.text}</Typography>
                </Button>
              );
            } else if (_getChoiceState(i, userChoice) === 'disabled') {
              return (
                <Button disabled key={i+1} variant='outlined' className={classes.item}>
                  {
                    e.img !== null 
                    ?<CardMedia className={classes.imageItem} image={`../static/img/${e.img}`} title="Contemplative Reptile" />
                    : <div></div>
                  }
                  <Typography>{e.text}</Typography>
                </Button>
              )
            } else if (_getChoiceState(i, userChoice) === 'selected') {
              return (
                <Button disabled key={i+1} variant='outlined' className={classes.selectedItem}>
                  {
                    e.img !== null 
                    ?<CardMedia className={classes.imageItem} image={`../static/img/${e.img}`} title="Contemplative Reptile" />
                    : <div></div>
                  }
                  <Typography>{e.text}</Typography>
                </Button>
              )
            }
          }

          return (
            <Button focusRipple key={i+1} variant='outlined' onClick={() => _handleChoice(i)} className={i===userChoice ? classes.choicedItem : classes.item}>
              {
                e.img !== null 
                ?<CardMedia className={classes.imageItem} image={`../static/img/${e.img}`} title="Contemplative Reptile" />
                : <div></div>
              }
              <Typography>{e.text}</Typography>
            </Button>
          )
        })
      }
      </div>
      <Button variant='outlined' onClick={() => _handleSubmit(userChoice)}>Submit</Button>
      {/* render the result after answer */}
      {submitted
        ? <div className={classes.result}>
          <Button variant='outlined' color='primary' onClick={_handleGetNext}>Go to Next Question</Button>
        </div>
        : <div></div>
      }
    </Paper>
  )
}