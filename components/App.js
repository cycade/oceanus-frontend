import react, { Component } from 'react';

import Layout from '../components/layout/Layout.js';
import Banner from '../components/layout/Banner.js';
import BGStory from '../components/info/BGStory.js';
import MapCollection from '../components/maps/MapCollection.js';
import NewsCollection from '../components/news/NewsCollection.js';
import Login from '../components/auth/Login.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      logged: false
    }
  }

  _isAuthorized() {
    return this.state.logged && this.state.token.length > 0;
  }

  _handleLogin(token) {
    this.setState({ token: token, logged: true });
  }

  _handleExpire() {
    this.setState({ token: '', logged: false });
  } 

  render() {
    if (this._isAuthorized()) {
      return (
        <Layout>
          <Banner />
          <BGStory />
          <MapCollection />
          <NewsCollection />
        </Layout>
      );
    } else {
      return <Login onSuccessLogin={this._handleLogin.bind(this)} />
    }
  }
  
}