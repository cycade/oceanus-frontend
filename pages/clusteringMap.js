import Head from 'next/head';
import NavigationBar from '../source/NavigationBar.js';
import MapCollection from "../components/maps/MapCollection";

export default function clusteringmap() {
  return (
    <div>
      <Head>
        {/* import map and map clustering */}
        <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
        <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>
        <script src="https://unpkg.com/leaflet.markercluster@1.0.6/dist/leaflet.markercluster.js"></script>
        <link type="text/css" rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.0.6/dist/MarkerCluster.css"/>
        <link type="text/css" rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.0.6/dist/MarkerCluster.Default.css"/>
      </Head>
      <NavigationBar />
      <MapCollection type='clustering' />
    </div>
  )
}