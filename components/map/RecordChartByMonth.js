import { Bar } from 'react-chartjs-2';
import { Typography, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(2),
    backgroundColor: 'white',
    // opacity: 0.8,
  },
  title: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  desc: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}))

export default function(props) {
  const classes = useStyles();

  const data = {
    labels: [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: `Occurrence Record`,
        backgroundColor: `rgba(78, 97, 90, 0.7)`,
        borderWidth: 2,
        hoverBackgroundColor: `rgba(45, 56, 52, 1)`,
        data: [63, 54, 80, 80, 61, 27, 19, 41, 62, 107, 47, 5]
      },
      // {
      //   label: `User Reported Occurrence Record`,
      //   backgroundColor: `rgba(25, 99, 132, 0.4)`,
      //   borderWidth: 2,
      //   hoverBackgroundColor: `rgba(25, 99, 132, 1)`,
      //   data: props.recordFromUser,
      // }
    ]
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Typography variant="h6" style={{textAlign: 'center', paddingTop: '20px'}}>Monthly Occurrence Record of Leadbeater's Possum</Typography>

          <Bar data={data} height={200}
            options={{ scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] } }}
            onElementsClick={e => { if (e[0]) { props.onChooseMonth(e[0]['_index']+1) }}}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.desc}>
          <Typography variant="h4" color='secondary' className={classes.title}>
            When to find possum? 
          </Typography >

          <Typography variant="body1">
          The chart shows monthly distribution about  Leadbeater’s Possum observation record.
          <strong>Spring and Autumn </strong>might be two best seasons to find possum. 
          October, March, and April have the <strong>most</strong> records and it can infer that these months are easier to find possums.
          The exudates and saps that are produced by plants and insects are Leadbeater’s Possums main food source. In these months, food is enough and the probability of finding possums is high. 
            
          <br />
          In June, July and December, records are quite low. That may due to two reasons. One is the reduction of humans exploration. In winter, the cold weather may make people decrease outdoor activities. Some of the habitats fall snow during the winter which makes people visual narrow. Hence, the observation of possums might decrease as well. 
          The other reason might be the food reduction. In winter, food resources may be critically low. 
          Some feeding stations are established to assist possums. Hence, possums activities may decrease as well.
          In these months, it may hard to find possums.
          </Typography >
        
        </Grid>
      </Grid>
    </div>
  );
}