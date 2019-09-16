import { Component } from 'react';
import getRecordPopup from '../utils/getRecordPopup.js';
import bushwalking from '../static/json/bushwalking.json';
import MapControlLabel from './MapControlLabel.js';

function makeGeojson(coords) {
  return ({
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": { "type": "LineString", "coordinates": coords }
      }
    ]
  });
}

function getMessageFromRecord(record) {
  return `
    Time: ${record.datetime}<br/>
    Weather: ${record.weather}<br/>
    Situation: ${record.situation}<br/>
    Hollow: ${record.hollow}<br/>
  `;
}

export default class RecordMap extends Component {
  constructor(props) {
    super(props);
    this.map = null;

    this.bushwalking = {};

    this.visibleBushwalkingId = -1;

    this.layers = {
      // show each record
      distribution: null,
      
      // highlight if some month selected #render
      recordsByMonth: null,
      
      // show records reported by user #render
      recordsFromUser: null,

      // show bushwalking route when icon selected
      bushwalking: null,

      // show heatmap
      heatmap: null,
      
      // show a temperorary plot when reporting
      temp: null,
    };

    this.state = {
      baseColor: '#22407F',
      markColor: '#c43a31',
      layerState: {
        'distribution': true,
        'recordsFromUser': false,
        'bushwalking': false,
        'heatmap': true,
      },
    };
  }

  _addRecordFromUser(record) {
    L.marker([record.latitude, record.longitude], {
      icon: L.mapquest.icons.flag({
        primaryColor: this.state.baseColor,
        secondaryColor: '#ABA998',
        shadow: true,
        size: 'sm',
        symbol: `${record['count']}`
      })
    })
    .bindPopup(getMessageFromRecord(record))
    .addTo(this.layers.recordsFromUser);
  }

  _toggleEnableSelect = (e) => {
    this.layers.temp.clearLayers();
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.layers.temp);

    this.props.onSelect([e.latlng.lat, e.latlng.lng]);
  }

  componentDidMount() {
    L.mapquest.key = 'jGneTJYe7bEeRvHy69LvAtGcADwoiNZ1';

    // initialize layer to store temperorary plot
    this.layers.temp = L.featureGroup();

    // initialize layer to store user generate plot
    this.layers.recordsFromUser = L.featureGroup();

    this.layers.bushwalking = L.featureGroup();
    // add bushwalking route
    for (let route of bushwalking.content) {
      this.bushwalking[route['name']] = {
        'route': route['route'],
        'info': route['info'],
      }

      let coord = [route['route'][0][1], route['route'][0][0]];
      let hikingIcon = L.icon({
        iconUrl: '/static/img/hiking.svg',
        iconSize: [25, 25], // size of the icon
      });

      L.marker(coord, {
        icon: hikingIcon,
      })

      // L.geoJSON(makeGeojson(route['route']))
      .bindPopup(`${route['name']}</br>Distance: ${route['distance']}, Level: ${route['level']}, Time: ${route['time']}, Region: ${route['region']}`)
      .addTo(this.layers.bushwalking);
    }

    // add click event for bushwalking icon
    this.layers.bushwalking.on("click", (event) => {
      if (event.layer._popup) {
        if (this.visibleBushwalkingId > 0) {
          this.layers.bushwalking.removeLayer(this.visibleBushwalkingId);
        }

        let bushwalkingName = event.layer._popup._content.split('</br>')[0];
        console.log(bushwalkingName);
        let route = this.bushwalking[bushwalkingName];
        let layer = L.geoJSON(makeGeojson(route['route']))
        .addTo(this.layers.bushwalking);

        this.visibleBushwalkingId = this.layers.bushwalking.getLayerId(layer);
      }
      this.map.flyTo([event.latlng.lat, event.latlng.lng], 12);
    });

    this.layers.distribution = L.layerGroup();
    // highlight the rest of occurrence records
    for (let record of this.props.data) {
      L.marker([record['latitude'], record['longitude']], {
        icon: L.mapquest.icons.via({
          primaryColor: this.state.baseColor,
          secondaryColor: '#ABA998',
          shadow: true,
          size: 'sm',
          symbol: `${record['count']}`
        })
      })
      .bindPopup(getRecordPopup(record))
      .addTo(this.layers.distribution);
    }

    // add record retrieved from database
    for (let record of this.props.recordsFromUser) {
      this._addRecordFromUser(record);
    }

    // add heatmap 
    this.layers.heatmap = L.heatLayer(
      this.props.data.map(e => {
        return [e.latitude, e.longitude, e.count]
      }),
      {radiue: 25, blur: 5, gradient: {0.1: 'blue', 0.3: 'lime', 0.45: 'red'}}
    )

    // add record retrieved from database
    for (let record of this.props.recordsFromUser) {
      this.layers.heatmap.addLatLng([record.latitude, record.longitude]);
    }

    // render the total map
    this.map = L.mapquest.map('recordmap', {
      center: [-37.631482, 145.913061],
      layers: [
        L.mapquest.tileLayer('light'),
        ...(
          Object.keys(this.layers)
            .filter(e => this.layers[e] !== null && this.state.layerState[e])
            .map(e => this.layers[e])
        ),
      ],
      zoom: 10
    })

    // highlight user's location
    L.mapquest.textMarker(this.props.userLocation, {
      text: 'Your Location',
      position: 'right',
      type: 'marker',
      icon: { primaryColor: '#DD3333', secondaryColor: '#DD3333', size: 'sm' }
    }).addTo(this.map);
  }

  componentDidUpdate(prevProps) {
    if (this.props.enableSelect && !prevProps.enableSelect) {
      this.map.on('click', this._toggleEnableSelect);
    } else if (!this.props.enableSelect && prevProps.enableSelect) {
      this.map.off('click', this._toggleEnableSelect);
      this.layers.temp.clearLayers();
    }

    if (prevProps.enableTemp && !this.props.enableTemp) {
      this.layers.temp.clearLayers();
    }

    let currentLength = this.props.recordsFromUser.length;
    if (currentLength > prevProps.recordsFromUser.length) {
      let newRecord = this.props.recordsFromUser[currentLength - 1];
      this._addRecordFromUser(newRecord);
      this.layers.heatmap.addLatLng([newRecord.latitude, newRecord.longitude]);
    }
  }

  _handleMapLayerChange(event, layer) {
    if (this.map.hasLayer(this.layers[layer])) {
      this.map.removeLayer(this.layers[layer]);
    } else {
      this.map.addLayer(this.layers[layer]);
    }
    let nextLayerState = this.state.layerState; nextLayerState[layer] = event.target.checked;
    this.setState({ layerState: nextLayerState});
  }

  render() {
    return (
      <div>
        <div style={{'position': 'absolute', 'top': '2vw', 'right': 10, 'zIndex': 1000, 'display': 'flex', 'flexDirection': 'column'}}>
        {
          Object.keys(this.state.layerState).map((e, i) => {
            return <MapControlLabel key={i+1}
              state={this.state.layerState[e]}
              setState={((event) => this._handleMapLayerChange(event, e)).bind(this)}
              name={e}
            />;
          })
        }
        </div>
        <div id='recordmap' style={{height: '92vh', width: '100vw'}}></div>

      </div>
    );
  }
}