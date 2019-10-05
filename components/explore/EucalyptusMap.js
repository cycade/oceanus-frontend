import Head from 'next/head';
import { Component } from 'react';
import forest from '../../static/json/filteredForest.json';

export default class EucalyptusMap extends Component {
  constructor(props) {
    super(props);
    this.species = props.species;
    this.heatmap = null;
    this.map = null;
  }

  componentDidMount() {
    L.mapquest.key = 'jGneTJYe7bEeRvHy69LvAtGcADwoiNZ1';

    this.heatmap = L.heatLayer(
      forest[this.species],
      {radiue: 25, blur: 5, gradient: {0.1: 'blue', 0.3: 'lime', 0.45: 'red'}}
    )

    this.map = L.mapquest.map('eucalyptus-map', {
      center: [-37.631482, 145.913061],
      layers: [
        L.mapquest.tileLayer('light'),
        this.heatmap,
      ],
      zoom: 10
    })
  }

  componentDidUpdate(nextProps) {
    this.map.removeLayer(this.heatmap);
    this.heatmap = L.heatLayer(
      forest[this.props.species],
      {radiue: 25, blur: 5, gradient: {0.1: 'blue', 0.3: 'lime', 0.45: 'red'}}
    ).addTo(this.map);
  }

  render() {
    return (
      <div>
        <Head>
          <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
          <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js"></script>
        </Head>
        <div id='eucalyptus-map' style={{height: '48vh'}}></div>
      </div>
    );
  }
}