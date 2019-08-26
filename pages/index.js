import react, { Component } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import NewsCollection from '../components/news/NewsCollection';
import Banner from '../components/layout/Banner.js';
import BGStory from '../components/info/BGStory';
import ChartWrapper from '../components/maps/ChartWrapper';
import MapCollection from '../components/maps/MapCollection';

class Home extends Component {
  constructor() {
    super();
  }

  componentDidAmount() {

  }

  render() {
    return (
      <div>
        <Head>
          <title>Oceanus page</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
          
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" />
          
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

          <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
          <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>
          <script src="https://unpkg.com/leaflet.markercluster@1.0.6/dist/leaflet.markercluster.js"></script>
          <link type="text/css" rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.0.6/dist/MarkerCluster.css"/>
          <link type="text/css" rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.0.6/dist/MarkerCluster.Default.css"/>
        </Head>

        <Layout>
          <Banner />
          <BGStory />
          <ChartWrapper />
          <MapCollection />
          <NewsCollection />
        </Layout>
      </div>
    );
  }
}

export default Home;