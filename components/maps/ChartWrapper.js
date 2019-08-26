import react, { Component } from 'react';
import LoadingSpinner from '../layout/LoadingSpinner.js';
import RecordBarchart from './RecordBarchart.js';

export default class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countByMonth: []
    }
  }

  _isChartReady() {
    return this.state.countByMonth.length > 0;
}

  componentDidMount() {
    fetch("https://psmapi.lcquest.com/api/v1/records/month")
    .then((res) => {
        return res.json();
    }).then((data) => {
        this.setState({countByMonth: Object.values(data)});
    })
  }

  render() {
    return (
      <div className='container p-auto mt-3' id='chart'>
        <div className='container col-12 d-flex justify-content-center mt-3 pt-3'>
          <p className='h2'>When to see a lovely Leadbeater’s Possum</p>
        </div>
        {
          this._isChartReady()
          ? <div className='row align-items-center'>
              <div className='container col-lg-4 col-md-6 col-12 py-3'>
                <RecordBarchart data={this.state.countByMonth} />
              </div>
              <div className='container col-lg-8 col-md-6 col-12 p-3'>
                <p className='h4 mx-5'><strong>October</strong>, <strong>March</strong>, and <strong>April</strong> have a high possibility of finding Leadbeater’s Possum occurrence. It’s better to be there in these months!</p>
              </div>
            </div>
          : <LoadingSpinner />
        }
      </div>
    )
  }
}