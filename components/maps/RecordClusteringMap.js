import react, { Component } from 'react';
import getDistanceFromLatLonInKm from '../../utils/getDistanceFromLatLonInKm.js';
import getRecordPopup from '../../utils/getRecordPopup.js';

const mapStyle = {
    height: 300,
    width: "100%"
}

export default class RecordClusteringMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        L.mapquest.key = 'jGneTJYe7bEeRvHy69LvAtGcADwoiNZ1';
        // initialize the record map
        let map = L.mapquest.map('map', {
            center: this.props.center,
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
            subtext: '' + Math.round(getDistanceFromLatLonInKm(this.props.nearest[0], this.props.nearest[1], this.props.center[0], this.props.center[1])) + "km from you",
            position: 'right',
            type: 'via',
            icon: {
                primaryColor: '#B30059',
                secondaryColor: '#000000',
                size: 'lg'
            }
        })
        .bindPopup(getRecordPopup(this.props.nearest))
        .addTo(map);
  
        // highlight the latest occurrence record
        L.mapquest.textMarker([this.props.latest['latitude'], this.props.latest['longitude']], {
            text: 'Latest Record',
            subtext: 'Occurs on ' + this.props.latest['year'] + "/" + this.props.latest['month'] + '/' + this.props.latest['day'],
            position: 'right',
            type: 'via',
            icon: {
                primaryColor: '#77B300',
                secondaryColor: '#000000',
                size: 'lg'
            }
        })
        .bindPopup(getRecordPopup(this.props.latest))
        .addTo(map);



        let markers = L.markerClusterGroup();

        // highlight the rest of occurrence records
        for (let record of this.props.rest) {
            let marker = L.marker([record['latitude'], record['longitude']], {
                icon: L.mapquest.icons.via({
                    primaryColor: '#D2D2D2',
                    secondaryColor: '#000000',
                    size: 'sm'
                })
            });

            marker.bindPopup(getRecordPopup(record));
            markers.addLayer(marker);
        }

        map.addLayer(markers);
    }

    render() {
        return (
            <div id='map' style={mapStyle}></div>
        );
    }
}