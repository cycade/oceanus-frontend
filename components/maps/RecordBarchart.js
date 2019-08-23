import react, { Component } from 'react';
import { XYPlot, XAxis, YAxis, VerticalBarSeries, LabelSeries } from 'react-vis';

let monthSeries = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];
  

export default class RecordBarchart extends Component {
    constructor(props) {
        super(props);
        this.renderData = monthSeries.map((value, index) => { return { 'x': value, 'y': this.props.data[index] } })
    }

    render() {
        const chartWidth = 1200;
        const chartHeight = 200;
        const chartDomain = [0, chartHeight];
        return (
            <XYPlot 
                xType="ordinal" 
                width={chartWidth} 
                height={chartHeight} 
                yDomain={chartDomain}
            >
                <XAxis />
                <YAxis />
                <VerticalBarSeries data={this.renderData} 
                    onValueClick={(datapoint, event)=>{
                        this.props.selector(datapoint.x);
                    }}
                />
                <LabelSeries
                    data={this.renderData.map(obj => {
                        return { ...obj, label: obj.y.toString() }
                    })}
                    labelAnchorX="middle"
                    labelAnchorY="text-after-edge"
                />
            </XYPlot>
        );
    }
}