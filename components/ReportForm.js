import { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
  },
}))

function getCurrentDate() {
  const today = new Date();
  return [today.getFullYear(), today.getMonth() + 1, today.getDate()];
}

function getCurrentTime() {
  const today = new Date();
  return [today.getHours(), today.getMinutes()];
}

export default function ReportFrom(props) {
  const classes = useStyles();
  const [selectedDate, setDate] = useState(getCurrentDate());
  const [selectedTime, setTime] = useState(getCurrentTime());

  return (
    <div className={classes.root}>
      
      <Typography>Report A Leadbeater's Possum</Typography>
      {/* <MuiPickersUtilsProvider>
        <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Date picker dialog"
          format="MM/dd/yyyy" value={selectedDate} onChange={setDate}
          KeyboardButtonProps={{ 'aria-label': 'change date', }}
        />
        <KeyboardTimePicker margin="normal" id="time-picker" label="Time picker"
          value={selectedDate} onChange={setTime}
          KeyboardButtonProps={{ 'aria-label': 'change time', }}
        />
      </MuiPickersUtilsProvider> */}
    </div>
  )
}