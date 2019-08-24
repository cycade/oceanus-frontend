import react, { Component } from 'react';
import LoadingSpinner from '../layout/LoadingSpinner.js';

import RecordMap from './RecordMap.js';
import RecordClusteringMap from './RecordClusteringMap';
import RecordBarchart from './RecordBarchart';

export default class MapCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: [],
            nearestRecord: null,
            latestRecord: null,
            restRecord: [],
            countByMonth: [],
            selectedMonth: null
        }
    }

    _isUserLocationReady() {
        return this.state.currentPosition.length === 2;
    }

    _isMapReady() {
        return this.state.nearestRecord !== null && this.state.latestRecord !== null && this.state.restRecord.length > 0;
    }

    _isChartReady() {
        return this.state.countByMonth.length > 0;
    }

    _handleMonthSelect(month) {
        this.setState({selectedMonth: month});
    }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(position => {
            const lng = position.coords.longitude;
            const lat = position.coords.latitude;
            this.setState({ currentPosition: [lat, lng] });

            fetch("https://psmapi.lcquest.com/api/v1/records/from?lat=" + lat + "&lng=" + lng)
            .then(res => {
                return res.json();
            }).then(data => {
                this.setState({
                    nearestRecord: data['nearest'],
                    latestRecord: data['latest'],
                    restRecord: data['rest']
                })
            })
        })
        
        fetch("https://psmapi.lcquest.com/api/v1/records/month")
        .then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({countByMonth: Object.values(data)});
        })
    }

    render() {
        if (this._isUserLocationReady() && this._isMapReady() && this._isChartReady()) {
            return (
            <div className='my-5 py-3'>
                <RecordMap
                center={this.state.currentPosition}
                nearest={this.state.nearestRecord}
                latest={this.state.latestRecord}
                rest={this.state.restRecord}
                month={this.state.selectedMonth}
                />

                <div className='mt-3'><br /></div>
                
                <div className='container mx-3 px-3'>
                    <RecordBarchart data={this.state.countByMonth} selector={this._handleMonthSelect.bind(this)} />
                </div>

                <div className='mt-3'><br /></div>

                <RecordClusteringMap
                center={this.state.currentPosition}
                nearest={this.state.nearestRecord}
                latest={this.state.latestRecord}
                rest={this.state.restRecord} />
            </div>)
        }
        return(
            <div className='my-5 py-5' style={{'height': '75vh'}}>
                <LoadingSpinner />
            </div>
        );
    }
}