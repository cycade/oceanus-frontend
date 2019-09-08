import { Component } from 'react';
import getRecordPopup from '../utils/getRecordPopup.js';
import * as turf from '@turf/turf';
import getUnion from '../utils/getUnionBuffer.js';
import bushwalking from '../static/json/bushwalking.json';

export default class RecordMap extends Component {
  constructor(props) {
    super(props);
    this.map = null;

    this.layers = {
      distribution: null,
      heatmap: null,
    };

    this.state = {
      baseColor: '#22407F',
      markColor: '#c43a31',
    };
  }

  componentDidMount() {
    L.mapquest.key = 'jGneTJYe7bEeRvHy69LvAtGcADwoiNZ1';

    this.layers.distribution = L.layerGroup();
    // highlight the rest of occurrence records
    for (let record of this.props.data) {
      L.marker([record['latitude'], record['longitude']], {
        icon: L.mapquest.icons.flag({
          primaryColor: this.state.baseColor,
          secondaryColor: '#3B5998',
          shadow: true,
          size: 'sm',
          symbol: `${record['count']}`
        })
      })
      .bindPopup(getRecordPopup(record))
      .addTo(this.layers.distribution);
    }

    // add heatmap 
    this.layers.heatmap = L.heatLayer(
      this.props.data.map(e => {
        return [e.latitude, e.longitude, e.count]
      }),
      {radiue: 25, blur: 5, gradient: {0.1: 'blue', 0.3: 'lime', 0.45: 'red'}}
    )

    // render the distribution map
    this.map = L.mapquest.map('recordmap', {
      center: [-37.631482, 145.913061],
      layers: [L.mapquest.tileLayer('light'), this.layers.distribution, this.layers.heatmap],
      zoom: 10
    })

    // highlight user's location
    L.mapquest.textMarker(this.props.userLocation, {
      text: 'Your Location',
      position: 'right',
      type: 'marker',
      icon: {
          primaryColor: '#333333',
          secondaryColor: '#333333',
          size: 'sm'
      }
    }).addTo(this.map);

    // add bushwalking bushwalking on the map
    L.geoJSON(bushwalking).addTo(this.map);

    // add 200m buffer around the record
    // let polygons = getUnion(this.props.data.map(e => {
    //   return [e.latitude, e.longitude];
    // }));

    // for (let p of polygons) {
    //   L.polygon(p).addTo(this.map);
    // }

    L.control.layers({}, {"Records": this.layers.distribution, "Heatmap": this.layers.heatmap}).addTo(this.map);
  }

  render() {
    return <div id='recordmap' style={{height: '92vh', width: '100vw'}}></div>
  }
}