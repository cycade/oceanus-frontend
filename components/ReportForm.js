import { useState } from 'react';
import { makeStyles, Typography, Grid, Slider, Input, InputLabel, Select, MenuItem, FormHelperText, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
  },
  selector: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export default function ReportFrom(props) {
  const classes = useStyles();
  const maxCount = 20;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [count, setCount] = useState(0);
  const [weather, setWeather] = useState('Sunny');
  const [situation, setSituation] = useState('On the tree');
  const [hollow, setHollow] = useState(1);

  const handleCountSliderChange = (event, newValue) => {
    setCount(newValue);
  };

  const handleCountInputChange = event => {
    setCount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleCountBlur = () => {
    if (value < 0) { setValue(0); }
    else if (value > 20) { setValue(20); }
  }

  const handleWeatherChange = (event) => {
    setWeather(event.target.value);
  }

  const handleSituationChange = (event) => {
    setSituation(event.target.value);
  }

  const handleHollowChange = (event) => {
    setHollow(event.target.value);
  }

  const _getRecordInfo = () => {
    return ({
      count: count,
      weather: weather,
      situation: situation,
    });
  }

  return (
    <div className={classes.root}>
      
      <Typography>Report A Leadbeater's Possum</Typography>
      <Typography>location: {props.latlng}</Typography>

      {/* date and time selector */}
      <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: 'flex' }}>
        <Grid container direction='column'>
          <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Date"
            format="dd/MMM/yyyy" value={selectedDate} onChange={setSelectedDate}
            KeyboardButtonProps={{ 'aria-label': 'change date', }}
          />
          <KeyboardTimePicker margin="normal" id="time-picker" label="Time"
            value={selectedDate} onChange={setSelectedDate}
            KeyboardButtonProps={{ 'aria-label': 'change time', }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      {/* count selector */}
      <Typography id="input-slider" gutterBottom>
        Count
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof count === 'number' ? count : 0}
            max={maxCount}
            onChange={handleCountSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={count}
            margin="dense"
            onChange={handleCountInputChange}
            onBlur={handleCountBlur}
            inputProps={{ step: 2, min: 0, max: maxCount, type: 'number', 'aria-labelledby': 'input-slider', }}
          />
        </Grid>
      </Grid>

      {/* weather selector */}
      <div className={classes.selector}>
        <InputLabel htmlFor="weather-helper">Weather Condition</InputLabel>
        <Select value={weather} onChange={handleWeatherChange} inputProps={{ name: 'weather', id: 'weather-helper' }}>
          <MenuItem value='Sunny'>Sunny</MenuItem>
          <MenuItem value='Cloudy'>Cloudy</MenuItem>
          <MenuItem value='Rainy'>Rainy</MenuItem>
          <MenuItem value='Snowy'>Snowy</MenuItem>
        </Select>
        <FormHelperText>Choose the weather when you met me</FormHelperText>
      </div>
      
      {/* situation selector */}
      <div className={classes.selector}>
        <InputLabel htmlFor="situation-helper">Situation</InputLabel>
        <Select value={situation} onChange={handleSituationChange} inputProps={{ name: 'situation', id: 'situation-helper' }}>
          <MenuItem value='On the tree'>On the tree</MenuItem>
          <MenuItem value='On the ground'>On the ground</MenuItem>
        </Select>
        <FormHelperText>Choose the situation when you met me</FormHelperText>
      </div>
      
      {/* hollow selector */}
      <div className={classes.selector}>
        <InputLabel htmlFor="hollow-helper">Hollow around?</InputLabel>
        <Select value={hollow} onChange={handleHollowChange} inputProps={{ name: 'hollow', id: 'hollow-helper' }}>
          <MenuItem value={1}>Yes</MenuItem>
          <MenuItem value={2}>No</MenuItem>
        </Select>
      </div>

      <Button variant='contained' onClick={() => props.onReport(_getRecordInfo())}>Submit</Button>
    </div>
  )
}