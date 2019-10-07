import Head from 'next/head';
import { Component } from 'react';
import forest from '../../static/json/filteredForest.json';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  legend: {
    background: 'linear-gradient(#e66465, #9198e5)',
  },
}))

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
      zoom: 9
    })

    this.map.options.minZoom = 9;
  }
  

  componentDidUpdate(nextProps) {
    this.map.removeLayer(this.heatmap);
    this.heatmap = L.heatLayer(
      forest[this.props.species],
      {radiue: 25, blur: 5, gradient: {0.1: 'blue', 0.3: 'lime', 0.45: 'red'}}
    ).addTo(this.map);
  }

  render() {
    // const classes = useStyles();
    return (
      <div>
        <Head>
          <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
          <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js"></script>
        </Head>

        <div style={{display: 'flex', justifyContent: 'space-between', position: 'absolute', zIndex: 1000}}>
          <div></div>
          <div style={{display: 'flex', flexDirection:'column', width: '60%', margin: '5px'}}>
            <div style={{textAlign: 'center'}}><strong>Density of Eucalyptus</strong></div>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
              <div>Higher</div><div>Lower</div>
            </div>
            <div style={{
              background: 'linear-gradient(0.25turn, rgba(255, 0, 0, 0.35), rgba(0, 255, 0, 0.35), rgba(0, 0, 255, 0.35))',
              height: '0.7vw',
            }}></div>
          </div>
        </div>

        <div id='eucalyptus-map' style={{height: '26vw'}}></div>
      </div>
    );
  }
}