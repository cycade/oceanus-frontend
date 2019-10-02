import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';


const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#6b7b46',
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
    backgroundColor: '#6b7b46',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundColor: '#6b7b46',
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
      width: '90%',
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
    }
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

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical"  >
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
              <Typography>{getStepContent(index)}</Typography>
              
            </StepContent>
          </Step>
        ))}
      </Stepper>
      
    </div>
  );
}
