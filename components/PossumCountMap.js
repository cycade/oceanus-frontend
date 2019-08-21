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
      var baseLayer = L.mapquest.tileLayer('map');

      var map = L.mapquest.map('map', {
        center: L.latLng(-37.82, 145.24),
        layers: baseLayer,
        zoom: 13
      });

      fetch("https://psmapi.lcquest.com/api/v1/records/from?lat=" + lat + "&lng=" + lng)
      .then((res) => {
        return res.json();
      }).then((data) => {
        let markers = L.markerClusterGroup();

        for (let e of data['rest']) {
            let marker = L.marker(new L.latLng(e.latitude, e.longitude), {
              title: 'inner title',
              icon: L.mapquest.icons.marker()
            });
            marker.bindPopup('outer title');
            markers.addLayer(marker);
        }

        map.addLayer(markers);


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
