import React, { Component, useState } from 'react';
import getDistanceFromLatLonInKm from '../asset/js/getDistanceFromLatLonInKm.js';

const mapStyle = {
  height: 800,
  width: "100%"
}

export default class PossumMap extends Component {
  constructor() {
    super();
    this.state = {
      "latitide": -38,
      "longitude": 145,
      "nearest": null,
      "latest": null,
      "rest": []
    };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(position => {
      // get current position
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      this.setState({longitude: lng, latitude: lat});

      // create map
      L.mapquest.key = 'jGneTJYe7bEeRvHy69LvAtGcADwoiNZ1';

      let map = L.mapquest.map('map', {
        center: [-37.9, 145.3],
        layers: L.mapquest.tileLayer('map'),
        zoom: 10
      })

      // fetch data from backend
      fetch("https://psmapi.lcquest.com/api/v1/records/from?lat=" + lat + "&lng=" + lng)
      .then((res) => {
        return res.json();
      }).then((data) => {
        let rest = data['rest'];
        let neareat = data['nearest'];
        let latest = data['latest'];
        this.setState({
          rest: rest,
          neareat: neareat,
          latest: latest
        })

        for (let e of data['rest']) {
          L.marker([e.latitude, e.longitude], {
            icon: L.mapquest.icons.via({
              primaryColor: '#D2D2D2',
              secondaryColor: '#000000',
              size: 'sm'
            })
          }).addTo(map);
        }

        // highlight the neareat occurrence record
        L.mapquest.textMarker([data['nearest'].latitude, data['nearest'].longitude], {
          text: 'Nearest Record',
          subtext: '' + Math.round(getDistanceFromLatLonInKm(data['nearest'].latitude, data['nearest'].longitude, lat, lng), 2) + "km from you",
          position: 'right',
          type: 'via',
          icon: {
            primaryColor: '#B30059',
            secondaryColor: '#000000',
            size: 'lg'
          }
        }).addTo(map);

        // highlight the latest occurrence record
        L.mapquest.textMarker([data['latest'].latitude, data['latest'].longitude], {
          text: 'Latest Record',
          subtext: 'Occurs on ' + data['latest']['year'] + "/" + data['latest']['month'] + '/' + data['latest']['day'],
          position: 'right',
          type: 'via',
          icon: {
            primaryColor: '#77B300',
            secondaryColor: '#000000',
            size: 'lg'
          }
        }).addTo(map);
      })

      // highlight the current location of user
      L.mapquest.textMarker([lat, lng], {
        text: 'Your Location',
        // subtext: 'Iconic coffeehouse chain',
        position: 'right',
        type: 'marker',
        icon: {
          primaryColor: '#333333',
          secondaryColor: '#333333',
          size: 'sm'
        }
      }).addTo(map);

    });
  }

  render() {
    return (
      <div>
        <div>Occurrence Records</div>
        <div id='map' style={mapStyle}></div>
      </div>
    );
  }
}
