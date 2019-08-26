import react, { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isLoading: false,
      hasFailed: false,
    }
  }

  _handleUserInput(event) {
    this.setState({ password: event.target.value });
  }

  _handleSubmit(event) {
    this.setState({ isLoading: true })
    event.preventDefault();

    axios.post("https://psmapi.lcquest.com/login", { password: this.state.password })
    .then(res => {
        this.setState({ isLoading: false })
        this.props.onSuccessLogin(res.data['token']);
    }).catch(err => {
        this.setState({ isLoading: false, hasFailed: true })
    })
  }

  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        </Head>
        <div className='bg-light vh-100 pt-5'>
          <p className='h2 mx-auto text-center mt-5 pt-5'>Welcome to Possum Nest!</p>
          <p className='mt-3 mx-auto text-center'>Only a Leadbeater's Possum could enter our web application</p>
          <div className='row my-auto'>
            <div className='offset-3 col-6 offset-lg-4 col-lg-4 mb-3 row'>
              <div className='col-12 mb-2'>
                <div className="input-group input-group-sm mb-2">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                  </div>
                  <input type="password" className="form-control" value={this.state.password} onChange={this._handleUserInput.bind(this)} />
                </div>
              </div>
              <div className='col-12 d-flex justify-content-between'>
                <div className='pt-2'>
                  {
                    this.state.isLoading
                    ? <small className='text-primary'>Loading</small>
                    : (this.state.hasFailed
                      ? <small className='text-danger'>Login Failed</small>
                      : <small className='text-primary'></small>)
                  }
                </div>
                <div className=''>            
                  <button type="button" className="btn btn-outline-dark btn-sm" onClick={this._handleSubmit.bind(this)}>Submit</button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
          
    )
  }
}