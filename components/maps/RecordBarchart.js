import react, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

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
        return (
            <div>
        <VictoryChart horizontal height={240} width={400} padding={{left:80}}
          domain={{x:[0.5, 12.5]}}
          domainPadding={{ x: 0, y: 35 }}
   
        >
          <VictoryBar
            style={{ data: { fill: "#c43a31" } }}
            barWidth={15}
             labels={this.props.data}
            data={[
              { x: 'January', y: 63 },
              { x: 'February', y: 54 },
              { x: 'March', y: 80 },
              { x: 'April', y: 80 },
              { x: 'May', y: 61 },
              { x: 'June', y: 27 },
              { x: 'July', y: 19 },
              { x: 'August', y: 41 },
              { x: 'September', y: 62 },
              { x: 'October', y: 107 },
              { x: 'November', y: 47 },
              { x: 'December', y: 5 },
            ]}
          />
        </VictoryChart>
      </div>
        );
    }
}