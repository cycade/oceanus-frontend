import react, { Component } from 'react';
import getDistanceFromLatLonInKm from '../../utils/getDistanceFromLatLonInKm.js';
import getRecordPopup from '../../utils/getRecordPopup.js';

const mapStyle = {
    height: 600,
    width: "100%"
}

export default class RecordClusteringMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseColor: '#22407F',
            markColor: '#c43a31',
        }
    }

    componentDidMount() {
        L.mapquest.key = 'jGneTJYe7bEeRvHy69LvAtGcADwoiNZ1';
        // initialize the record map
        let map = L.mapquest.map('clustering-map', {
            center: [-37.631482, 145.913061],
            layers: L.mapquest.tileLayer('map'),
            zoom: 10
        })

        // highlight the current location of user
        L.mapquest.textMarker(this.props.center, {
            text: 'Your Location',
            position: 'right',
            type: 'marker',
            icon: {
                primaryColor: '#333333',
                secondaryColor: '#333333',
                size: 'sm'
            }
        }).addTo(map);
  
        // highlight the neareat occurrence record
        L.mapquest.textMarker([this.props.nearest['latitude'], this.props.nearest['longitude']], {
            text: 'Nearest Record',
            subtext: '' + Math.round(getDistanceFromLatLonInKm(this.props.nearest['latitude'], this.props.nearest['longitude'], this.props.center[0], this.props.center[1])) + "km from you",
            position: 'right',
            type: 'marker',
            icon: {
                primaryColor: '#1B4F72',
                secondaryColor: '#1B4F72',
                size: 'md'
            }
        })
        .bindPopup(getRecordPopup(this.props.nearest))
        .addTo(map);
  
        // highlight the latest occurrence record
        L.mapquest.textMarker([this.props.latest['latitude'], this.props.latest['longitude']], {
            text: 'Latest Record',
            subtext: 'Occurs on ' + this.props.latest['year'] + "/" + this.props.latest['month'] + '/' + this.props.latest['day'],
            position: 'right',
            type: 'marker',
            icon: {
                primaryColor: '#186A3B',
                secondaryColor: '#186A3B',
                size: 'md'
            }
        })
        .bindPopup(getRecordPopup(this.props.latest))
        .addTo(map);



        let markers = L.markerClusterGroup();

        // highlight the rest of occurrence records
        for (let record of this.props.rest) {
            let marker = L.marker([record['latitude'], record['longitude']], {
                icon: L.mapquest.icons.flag({
                    primaryColor: this.state.baseColor,
                    secondaryColor: '#3B5998',
                    shadow: true,
                    size: 'sm',
                    symbol: `${record['count']}`
                })
            });

            marker.bindPopup(getRecordPopup(record));
            markers.addLayer(marker);
        }

        map.addLayer(markers);
    }

    render() {
        return (
            <div id='clustering-map' style={mapStyle}></div>
        );
    }
}