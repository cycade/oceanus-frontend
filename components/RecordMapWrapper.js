import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

import RecordMap from './RecordMap.js';
import RecordChartByMonth from './RecordChartByMonth.js';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
  },
  mapcontainer: {
    position: 'relative'
  },
}))

export default function RecordMapWrapper(props) {
  const classes = useStyles();
  const [userLocation, setUserLocation] = useState([]);
  const [records, setRecords] = useState([]);
  const [recordsByMonth, setMonthRecords] = useState([]);

  function _isUserLocationReady() {
    return userLocation.length > 0;
  }

  function _isRecordsReady() {
    return records.length > 0;
  }

  function _isMonthRecordsReady() {
    return recordsByMonth.length > 0;
  }

  useEffect(() => {
    // get user's location
    window.navigator.geolocation.getCurrentPosition(position => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setUserLocation([lat, lng]);
    })

    // fetch occurrence records from backend
    fetch("https://psmapi.lcquest.com/api/v1/records")
    .then(res => {
      return res.json();
    }).then(data => {
      setRecords(data);
    })

    // fetch occurrence records by month from backend
    fetch("https://psmapi.lcquest.com/api/v1/records/month")
    .then(res => {
      return res.json();
    }).then(data => {
      setMonthRecords(data);
    })
  }, [])

  return (
    <div className={classes.root}>
      {
        _isRecordsReady()
        ? <div className={classes.mapcontainer}>
          <div style={{ position: 'absolute', zIndex: 1000, marginLeft: 50 }}><RecordChartByMonth /></div>
          <RecordMap data={records} userLocation={userLocation} />
        </div>
        : <div>loading</div>
      }
    </div>
  )
}