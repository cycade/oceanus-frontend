import react, { Component } from 'react';
import {
  XYPlot,
  XAxis, // Shows the values on x axis
  YAxis, // Shows the values on y axis
  VerticalBarSeries,
  LabelSeries
} from 'react-vis';

let monthSeries = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

export default class PossumCountByMonthBarchart extends Component {
  constructor(props) {
    super(props);
    this.renderData = [];
    console.log(this.props);
    for (let i = 0; i < 12; i += 1) {
      this.renderData.push({'x': monthSeries[i], 'y': this.props.data[i] });
    }
  }

  render() {
      const data = this.props.data;
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
              <VerticalBarSeries
                  data={this.renderData}
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
