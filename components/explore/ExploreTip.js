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
      marginTop: theme.spacing(8),
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
  'Illumination': {
    'desc': [
      "Visit the Leadbeater's Possum habitat is important to bring plenty of lights to walk in a moonless night, including headlamp, flashlight and spares batteries. Headlamp with two head-bands, one band goes from back to the front helps to keep the actual light in place, the headlamp it will help you walk safely in the native forest's rough surface to find Leadbeater's Possums.",
    ].join(' '),
    'img': 'illumination.jpg',
    'img1': 'illumination-1.jpg',
  },
  'Hiking Poles': {
    'desc': [
      "To find the Leadbeater's Possum at night, choose the correct size hiking pole to help you to walk safer and closer for the habitat observation.",
      "Thus, you will need extra stability to walk in the dense wet rugged mossy grass with hiking poles. Basically, the top of the handle should be at the waist or hip level and the elbow should be at 90 degrees, so it can help you to balance your walk."
    ].join(' '),
    'img': 'poles.jpg',
    'img1': 'poles-1.jpg',
  },
  'Thermal imaging cameras': {
    'desc': [
      "The Leadbeater's Possum are small and speedy, mostly active at night feeding on insects and sweet nectar in the habitat has a dense understory of wattle.",
      "Under the complete darkness at night, the thermal imager helps to converts the energy of the possum’s infrared wavelength of into visible light, so you can find it easier in the dark night even though the cover of trees."
    ].join(' '),
    'img': 'camera.jpg',
    'img1': 'camera-1.jpg',
  },
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(-1);
  const steps = Object.keys(equipments);

  const handleClick = (index) => {
    if (activeStep === index) {
      setActiveStep(-1);
    } else {
      setActiveStep(index);
    }
  }

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className={classes.title}>
          <Typography variant='h4' align='center' color='secondary'>What equipment should I take?</Typography>
          <Typography align='center'>
            Passing through dark, wet and dense mountain ash forest is dangerous. 
            Leadbeater's Possums live is a mysterious species and difficult to detect, as it typically nests in large old trees and only emerges under the cover of night.
            They live in really thick forest with 80-metre-tall trees, 30-metres in the mid story and really dense understory. 
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label} disabled={false}>
                <StepLabel
                  className={classes.keybar}
                  onClick={() => handleClick(index)}
                  StepIconComponent={SinuoStepIcon}
                >
                  <Typography variant='h6' style={{color: '#000', fontWeight:500}}>{label}</Typography>
                </StepLabel>
                <StepContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} className={classes.tipContent}>
                      <Typography>{equipments[label]['desc']}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CardMedia style={{height: 180}} image={`../../static/img/equipment/${equipments[label]['img']}`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CardMedia style={{height: 180}} image={`../../static/img/equipment/${equipments[label]['img1']}`} />
                    </Grid>              
                  </Grid>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Paper>
  );
}
