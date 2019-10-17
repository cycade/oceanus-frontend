import { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, Button, Drawer, Snackbar, Typography, LinearProgress } from '@material-ui/core';

import RecordMap from './RecordMap.js';
import RecordChartByMonth from './RecordChartByMonth.js';
import ReportFrom from './ReportForm.js';
import Dialog from './Dialog.js';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: theme.spacing(8),
  },
  mapcontainer: {
    position: 'relative'
  },
}))

export default function RecordMapWrapper(props) {
  const classes = useStyles();
  // the location of users
  const [userLocation, setUserLocation] = useState([]);

  // if the record is fetched successfully
  const [records, setRecords] = useState([]);
  const [recordsByMonth, setMonthRecords] = useState(0);

  // if user start to report a record
  const [selectState, setSelectState] = useState(false);

  // if drawer should open to user
  const [drawerState, setDrawerState] = useState(false);

  // if congratulation dialog shows
  const [dialogState, setDialogState] = useState(false);
  
  // if a location has been chosen for possum record
  const [selectedLocation, setLocation] = useState([]);

  // store all records uploaded by users
  const [recordsFromUser, setUserRecords] = useState([]);

  // if the last record is popular
  const [isLastPopular, setPopular] = useState('pending');

  function _isUserLocationReady() {
    return userLocation.length > 0;
  }

  function _isRecordsReady() {
    return records.length > 0 && recordsFromUser.length > 0;
  }

  function _isMonthRecordsReady() {
    return recordsByMonth > 0;
  }

  function _handleOpenDrawer() {
    setDrawerState(true);
  }

  function _handleCloseDrawer() {
    setDrawerState(false);
  }

  function _handleSelectLocation(data) {
    setLocation(data);
    _handleOpenDrawer();
  }
  
  function _handleReport(data, isPopular) {
    axios.post('https://psmapi.lcquest.com/recordsfromuser', data)
    .then(function (response) {

    })
    .catch(function (error) {
      console.log(error);
    });

    setPopular(isPopular);
    _handleCloseDrawer();
    setSelectState(false);
    setDialogState(true);
    setUserRecords([ ...recordsFromUser, data ]);
  }

  function _getUserRecordByMonth() {
    let recordByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let record of recordsFromUser) {
      recordByMonth[parseInt(record.datetime.split('-')[1])-1] += record.count;
    }
    return recordByMonth;
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

    // fetch occurrence records by month from backend
    fetch("https://psmapi.lcquest.com/recordsfromuser")
    .then(res => {
      return res.json();
    }).then(data => {
      setUserRecords(data);
    })
  }, [])

  return (
    <div className={classes.root}>
      {
        _isRecordsReady()
        ? <div className={classes.mapcontainer}>

          <RecordMap
            data={records}
            recordsFromUser={recordsFromUser}
            userLocation={userLocation}
            enableSelect={selectState}
            enableTemp={drawerState}
            monthSelected={recordsByMonth}
            onSelect={_handleSelectLocation}
          />

          <div style={{ position: 'absolute', zIndex: 1000, marginTop: -80, width:'100vw', display: 'flex', justifyContent: 'center' }}>
            <Snackbar style={{ marginTop: '120px' }}
              anchorOrigin={{'vertical': 'top', 'horizontal': 'center'}}
              open={selectState}
              autoHideDuration={5000}
              onClose={() => {}}
              ContentProps={{ 'aria-describedby': 'message-id', }}
              message={<Typography variant='h6' id="message-id">Click on the specific location of the sighting on the map</Typography>}
            />
            {
              selectState
              ? <Button variant='contained' color='primary' onClick={() => setSelectState(false)}>Quit Report</Button>
              : <Button variant='contained' color='primary' onClick={() => setSelectState(true)}>Report</Button>
            }
          </div>

          <Drawer open={drawerState} onClose={_handleCloseDrawer}>
            <ReportFrom latlng={selectedLocation} onReport={_handleReport}/>
          </Drawer>

          <Dialog
            open={dialogState}
            onClose={() => setDialogState(false)}
            isPopular={isLastPopular}
            count={recordsFromUser.length > 0 ? recordsFromUser[recordsFromUser.length - 1].count : 0}
          />
        </div>
        : <div style={{marginTop: '240px', marginLeft: '10vw', marginRight: '10vw'}}>
          <Typography variant='subtitle1' align='center' color='secondary'>Finding the Leadbeater's Possum for you</Typography>
          <LinearProgress color='primary'/>
        </div>
  
      }
    </div>
  )
}