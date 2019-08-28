import react, { Component } from 'react';
import getDistanceFromLatLonInKm from '../../utils/getDistanceFromLatLonInKm.js';
import getRecordPopup from '../../utils/getRecordPopup.js';

const mapStyle = {
    height: 600,
    width: "100%"
}

let monthSeries = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

export default class RecordMap extends Component {
    constructor(props) {
        super(props);
        // initialize the record map
        this.map = null;
        this.highlightLayer = null;
        this.state = {
            baseColor: '#22407F',
            markColor: '#c43a31',
        }
    }

    componentDidMount() {
        L.mapquest.key = 'jGneTJYe7bEeRvHy69LvAtGcADwoiNZ1';

        this.highlightLayer = L.featureGroup();
        // initialize the record map
        this.map = L.mapquest.map('recordMap', {
            center: [-37.631482, 145.913061],
            layers: [L.mapquest.tileLayer('map'), this.highlightLayer],
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
        }).addTo(this.map);
  
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
        .addTo(this.map);
  
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
        .addTo(this.map);

        // highlight the rest of occurrence records
        for (let record of this.props.rest) {
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
            .addTo(this.map);
        }
    }

    componentWillReceiveProps(nextProps) {
        let monthIndex = nextProps.month;
        this.highlightLayer.clearLayers();
        this.map.flyTo([-37.631482, 145.913061], 10);
        if (monthIndex !== -1) {
            for (let record of this.props.rest) {
                if (record['month'] === monthIndex + 1) {
                    L.marker([record['latitude'], record['longitude']], {
                        icon: L.mapquest.icons.flag({
                            primaryColor: this.state.markColor,
                            secondaryColor: this.state.markColor,
                            shadow: true,
                            size: 'md',
                            symbol: `${record['count']}`
                        })
                    })
                    .bindPopup(getRecordPopup(record))
                    .addTo(this.highlightLayer);
                }
            }
        }
    }

    _

    render() {
        return (
            <div id='recordMap' style={mapStyle}></div>
        );
    }
}