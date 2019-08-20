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
      console.log(lat, lng);
      this.setState({longitude: lng, latitude: lat});

      L.mapquest.key = 'jGneTJYe7bEeRvHy69LvAtGcADwoiNZ1';

      let map = L.mapquest.map('map', {
        center: [-38, 145],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
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
