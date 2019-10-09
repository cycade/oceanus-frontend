import { Component } from 'react';
import bushwalking from '../../static/json/bushwalking.json';
import MapControlLabel from './MapControlLabel.js';
import { Typography } from '@material-ui/core';
import { borderRadius } from '@material-ui/system';

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
    Time: ${record.datetime ? record.datetime.slice(0, 10) : record['year'] + '-' + record['month'] + '-' + record['day']}<br/>
    Count: ${record.count}<br/>
    Location: [${Math.round(record.latitude*1000)/1000}, ${Math.round(record.longitude*1000)/1000}]<br/>
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
      // recordsFromUser: null,

      // show bushwalking route when icon selected
      bushwalking: null,

      // show heatmap
      heatmap: null,
      
      // show a temperorary plot when reporting
      temp: null,
    };

    this.state = {
      baseColor: '#000080',
      markColor: '#c43a31',
      layerState: {
        'distribution': true,
        // 'recordsFromUser': false,
        'bushwalking': false,
        'heatmap': true,
      },
    };
  }

  _addRecordFromUser(record) {
    L.marker([record.latitude, record.longitude], {
      icon: L.mapquest.icons.via({
        primaryColor: '#dc143c',
        secondaryColor: '#233333',
        shadow: true,
        size: 'sm',
        symbol: `${record['count']}`
      })
    })
    .bindPopup(getMessageFromRecord(record))
    .addTo(this.layers.distribution);
  }

  _addHighlightRecord(record) {
    L.marker([record['latitude'], record['longitude']], {
      icon: L.mapquest.icons.via({
        primaryColor: '#ff6347',
        secondaryColor: '#CCCCCC',
        shadow: true,
        size: 'md',
        symbol: `${record['count']}`
      })
    })
    .bindPopup(getMessageFromRecord(record))
    .addTo(this.layers.recordsByMonth);
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

    this.layers.recordsByMonth = L.featureGroup();

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
        iconSize: [30, 30], // size of the icon
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
          secondaryColor: '#eeeeee',
          shadow: true,
          size: 'sm',
          symbol: `${record['count']}`
        })
      })
      .bindPopup(getMessageFromRecord(record))
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
        this.layers.recordsByMonth,
      ],
      zoom: 10
    })

    // highlight user's location
    if (this.props.userLocation.length > 0) {
      L.mapquest.textMarker(this.props.userLocation, {
        text: 'Your Location',
        position: 'right',
        type: 'marker',
        icon: { primaryColor: '#DD3333', secondaryColor: '#DD3333', size: 'sm' }
      }).addTo(this.map);  
    }
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

    if (this.props.monthSelected !== prevProps.monthSelected && this.props.monthSelected !== 0) {
      if (this.map.hasLayer(this.layers.distribution)) {
        this.layers.recordsByMonth.clearLayers();
        for (let record of this.props.data) {
          if (parseInt(record['month']) === this.props.monthSelected) {
            this._addHighlightRecord(record);
          }
        }  
      }
    }

    if (prevProps.userLocation.length === 0 && this.props.userLocation.length > 0) {
      L.mapquest.textMarker(this.props.userLocation, {
        text: 'Your Location',
        position: 'right',
        type: 'marker',
        icon: { primaryColor: '#DD3333', secondaryColor: '#DD3333', size: 'sm' }
      }).addTo(this.map);  
    }
  }

  _handleMapLayerChange(event, layer) {
    if (this.map.hasLayer(this.layers[layer])) {
      this.map.removeLayer(this.layers[layer]);
      if (this.layers[layer] === this.layers.distribution) {
        this.layers.recordsByMonth.clearLayers();
      }
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
          <div style={{marginBottom: '8px', paddingLeft: '40px'}}>
            <Typography variant='h6'>Data Source</Typography>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <div style={{display: 'flex'}}>
                <div style={{height: '10px', width: '10px', backgroundColor: '#000080', display:'inline-block', marginTop: '4px', marginRight: '2px'}}></div>
                <div>Offcial data</div>
              </div>
              <div style={{display: 'flex'}}>
                <div style={{height: '10px', width: '10px', backgroundColor: '#dc143c', display:'inline-block', marginTop: '4px', marginRight: '2px'}}></div>
                <div>Reported data</div>
              </div>
            </div>
          </div>

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