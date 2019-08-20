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
    });

    L.mapquest.key = 'jGneTJYe7bEeRvHy69LvAtGcADwoiNZ1';

    L.mapquest.map('map', {
      center: [this.state.latitide, this.state.longitude],
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
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
