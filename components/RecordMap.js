import { Component } from 'react';
import getRecordPopup from '../utils/getRecordPopup.js';
import bushwalking from '../static/json/bushwalking.json';

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
      lastPoint: null,
    };
  }

  _addRecordFromUser(record) {
    L.marker(record.latlng, {
      icon: L.mapquest.icons.flag({
        primaryColor: this.state.baseColor,
        secondaryColor: '#ABA998',
        shadow: true,
        size: 'sm',
        symbol: `${record['count']}`
      })
    }).addTo(this.layers.recordsFromUser);
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
      L.marker(coord, {
        icon: L.mapquest.icons.incident({
          primaryColor: this.state.baseColor,
          secondaryColor: '#ABA998',
          shadow: true,
          size: 'sm',
        })
      })

      // L.geoJSON(makeGeojson(route['route']))
      .bindPopup(route['name'])
      .addTo(this.layers.bushwalking);
    }

    this.layers.bushwalking.on("click", (event) => {
      if (event.layer._popup) {
        if (this.visibleBushwalkingId > 0) {
          this.layers.bushwalking.removeLayer(this.visibleBushwalkingId);
        }

        let bushwalkingName = event.layer._popup._content;
        let route = this.bushwalking[bushwalkingName];
        let layer = L.geoJSON(makeGeojson(route['route']))
        .bindPopup(route['info'])
        .addTo(this.layers.bushwalking);
        console.log(this.layers.bushwalking.getLayerId(layer));

        this.visibleBushwalkingId = this.layers.bushwalking.getLayerId(layer);
      }
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

    // add heatmap 
    this.layers.heatmap = L.heatLayer(
      this.props.data.map(e => {
        return [e.latitude, e.longitude, e.count]
      }),
      {radiue: 25, blur: 5, gradient: {0.1: 'blue', 0.3: 'lime', 0.45: 'red'}}
    )

    // render the total map
    this.map = L.mapquest.map('recordmap', {
      center: [-37.631482, 145.913061],
      layers: [
        L.mapquest.tileLayer('light'),
        this.layers.distribution,
        this.layers.heatmap,
        this.layers.temp,
        this.layers.recordsFromUser,
        this.layers.bushwalking,
      ],
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


    // add layer control tool on topright
    L.control.layers({}, {
      "Records": this.layers.distribution,
      "Heatmap": this.layers.heatmap,
      "Temp": this.layers.temp,
      "Upload": this.layers.recordsFromUser,
      "Bushwalking": this.layers.bushwalking,
    }).addTo(this.map);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.enableSelect !== this.props.enableSelect ||
      nextProps.recordsFromUser.length !== this.props.recordsFromUser.length || 
      nextProps.enableTemp !== this.props.enableTemp
    );
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
      this._addRecordFromUser(this.props.recordsFromUser[currentLength - 1]);
    }
  }

  render() {
    return <div id='recordmap' style={{height: '92vh', width: '100vw'}}></div>;
  }
}