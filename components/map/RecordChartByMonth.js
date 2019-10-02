import { HorizontalBar } from 'react-chartjs-2';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: 'white',
    opacity: 0.8,
  },
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
        label: `Official Occurrence Record`,
        backgroundColor: `rgba(78, 97, 90, 0.7)`,
        borderWidth: 2,
        hoverBackgroundColor: `rgba(45, 56, 52, 1)`,
        data: [63, 54, 80, 80, 61, 27, 19, 41, 62, 107, 47, 5]
      },
      {
        label: `User Reported Occurrence Record`,
        backgroundColor: `rgba(25, 99, 132, 0.4)`,
        borderWidth: 2,
        hoverBackgroundColor: `rgba(25, 99, 132, 1)`,
        data: props.recordFromUser,
      }
    ]
  };

  return (
    <div className={classes.root}>
      <Typography>Occurrence Record of Leadbeater's Possum</Typography>
      <HorizontalBar data={data} height={300}
        options={{ scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] } }}
        onElementsClick={e => { if (e[0]) { props.onChooseMonth(e[0]['_index']+1) }}}
      />
    </div>
  );
}