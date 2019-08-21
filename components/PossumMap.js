import React, { Component, useState } from 'react';

const mapStyle = {
  height: 800,
  width: "100%"
}

export default class PossumMap extends Component {
  constructor() {
    super();
    this.state = {"latitide": -38, "longitude": 145};
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(position => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      this.setState({longitude: lng, latitude: lat});

      L.mapquest.key = 'jGneTJYe7bEeRvHy69LvAtGcADwoiNZ1';

      let map = L.mapquest.map('map', {
        center: [-37.9, 145.3],
        layers: L.mapquest.tileLayer('map'),
        zoom: 10
      })

      fetch("https://psmapi.lcquest.com/api/v1/records/from?lat=" + lat + "&lng=" + lng)
      .then((res) => {
        console.log(res);
        return res.json();
      }).then((data) => {
        for (let e of data['rest']) {
          L.marker([e.latitude, e.longitude], {
            icon: L.mapquest.icons.via({
              primaryColor: '#D2D2D2',
              secondaryColor: '#000000',
              size: 'sm'
            })
          }).addTo(map);
        }

        L.marker([data['nearest'].latitude, data['nearest'].longitude], {
          icon: L.mapquest.icons.via({
            primaryColor: '#020202',
            secondaryColor: '#000000',
            size: 'sm'
          })
        }).addTo(map);

        L.marker([data['latest'].latitude, data['latest'].longitude], {
          icon: L.mapquest.icons.via({
            primaryColor: '#D202D2',
            secondaryColor: '#000000',
            size: 'sm'
          })
        }).addTo(map);
      })

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
        <div>Latitude: {this.state.latitude}</div>
        <div>Longitude: {this.state.longitude}</div>
        <div id='map' style={mapStyle}></div>
      </div>
    );
  }
}
