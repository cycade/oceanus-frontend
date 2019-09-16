import { useState, useEffect } from 'react';
import { makeStyles, Typography, Grid, Slider, Input, InputLabel, Select, MenuItem, FormHelperText, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import axios from 'axios';
import getDistanceFromLatLonInKm from '../utils/getDistanceFromLatLonInKm.js';

const popularText = {
  'pending': '',
  'popular': 'It\'s a popular place!',
  'unpopular': 'It\'s amazing to see it here!', 
}

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
  const [count, setCount] = useState(1);
  const [weather, setWeather] = useState('Sunny');
  const [situation, setSituation] = useState('On the tree');
  const [hollow, setHollow] = useState(1);
  const [isPopular, setPopular] = useState('pending');

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
      latitude: props.latlng[0],
      longitude: props.latlng[1],
      datetime: selectedDate.toJSON(),
      count: count,
      weather: weather,
      situation: situation,
      hollow: hollow === 1,
      isPopular: isPopular,
    });
  }

  useEffect(() => {
    axios.get(`https://psmapi.lcquest.com/api/v1/records/nearest?lat=${props.latlng[0]}&lng=${props.latlng[1]}`)
    .then(function (response) {
      let lat = response.data.latitude;
      let lng = response.data.longitude;
      setPopular(getDistanceFromLatLonInKm(props.latlng[0], props.latlng[1], lat, lng) < 2 ? 'popular' : 'unpopular');
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  return (
    <div className={classes.root}>
      
      <Typography>Report A Leadbeater's Possum</Typography>
      {/* <Typography variant='subtitle2'>{popularText[isPopular]}</Typography> */}

      {/* date and time selector */}
      <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: 'flex' }}>
        <Grid container direction='column'>
          <KeyboardDateTimePicker margin="normal" id="date-picker-dialog" label="Date"
            format="dd/MMM/yyyy hh:mm:ss" value={selectedDate} onChange={setSelectedDate}
            maxDate={new Date()}
            KeyboardButtonProps={{ 'aria-label': 'change date', }}
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
            value={typeof count === 'number' ? count : 1}
            min={1} max={maxCount}
            onChange={handleCountSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Typography>{count}</Typography>
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
          <MenuItem value={0}>No</MenuItem>
        </Select>
      </div>

      <Button variant='contained' onClick={() => props.onReport(_getRecordInfo(), isPopular)}>Submit</Button>
    </div>
  )
}