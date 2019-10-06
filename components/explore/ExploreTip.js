import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#6b7b69',
    zIndex: 1,
    color: '#fff',
    width: 28,
    height: 28,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  active: {
    backgroundColor: '#6b7b69',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundColor: '#6b7b69',
  },
});

function SinuoStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {props.icon}
    </div>
  );
}

 const useStyles = makeStyles(theme => ({
    root: {
      margin: theme.spacing(3),
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    keybar: {
      '&:hover': {
        backgroundColor: '#ddd',
        borderRadius: '8px',
      },
      color: '#000',
      padding: theme.spacing(2),
    },
    tipContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    img: {

    },
  }));

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

const equipments = {
  'Hiking Poles': {
    'desc': [
      'Choose the correct size hiking pole help to walk safer, as you may need extra stability because at night time even the most experienced hikers can feel off-balance.',
      '(Basically, the top of the handle should be at the waist/hip level and the elbow should be at 90 degrees.)',
    ].join(' '),
    'img': 'poles.jpg',
  },
  'Illumination': {
    'desc': [
      'Bring plenty of lights for night hiking, so you know where you are going on a moonless night, such as the headlamp, flashlight and spares batteries.',
    ].join(' '),
    'img': 'illumination.jpg',
  },
  'Thermal imaging cameras': {
    'desc': [
      'Many warm-blooded animals are mostly active at night, under the complete darkness to remain undetected.',
      'The thermal imager converts the energy of the infrared wavelength into a visible light display in all wether condition.',
      'Thermal cameras can see people running in the night, even through the cover of trees.',
    ].join(' '),
    'img': 'camera.jpg',
  },
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(-1);
  const steps = Object.keys(equipments);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className={classes.title}>
          <Typography variant='h4' style={{textAlign: 'center'}} color='secondary'>What equipment should I take?</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label} disabled={false}>
            <StepLabel
              className={classes.keybar}
              onClick={() => { setActiveStep(index); }}
              StepIconComponent={SinuoStepIcon}
            >
              <div style={{color: '#000', fontWeight:500}}>{label}</div>
            </StepLabel>
            <StepContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={10} className={classes.tipContent}>
                  <Typography>{equipments[label]['desc']}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <CardMedia style={{height: 180}} image={`../../static/img/equipment/${equipments[label]['img']}`} />
                </Grid>              
              </Grid>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      </Grid></Grid>
    </Paper>
  );
}
