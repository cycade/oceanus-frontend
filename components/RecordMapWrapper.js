import { useState, useEffect } from 'react';
import { makeStyles, Button, Drawer } from '@material-ui/core';

import RecordMap from './RecordMap.js';
import RecordChartByMonth from './RecordChartByMonth.js';
import ReportFrom from './ReportForm.js';

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
  const [drawerState, setDrawerState] = useState(false);

  function _isUserLocationReady() {
    return userLocation.length > 0;
  }

  function _isRecordsReady() {
    return records.length > 0;
  }

  function _isMonthRecordsReady() {
    return recordsByMonth.length > 0;
  }

  function _handleOpenDrawer() {
    setDrawerState(true);
  }

  function _handleCloseDrawer() {
    setDrawerState(false);
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
        // true
        ? <div className={classes.mapcontainer}>
          <div style={{ position: 'absolute', zIndex: 1000, marginLeft: 50 }}><RecordChartByMonth /></div>
          <RecordMap data={records} userLocation={userLocation} />
          {/* <div style={{ height: '92vh', width: '100vw', backgroundColor: 'black'}}></div> */}
          <div style={{ position: 'absolute', zIndex: 1000, marginTop: -80, width:'100vw', display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' color='primary' onClick={_handleOpenDrawer}>Report</Button>
          </div>
          <Drawer open={drawerState} onClose={_handleCloseDrawer}>
            <ReportFrom />
          </Drawer>
        </div>
        : <div>loading</div>
      }
    </div>
  )
}