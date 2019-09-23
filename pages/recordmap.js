import Head from "next/head";
import NavigationBar from '../components/NavigationBar.js';
import RecordMapWrapper from "../components/map/RecordMapWrapper.js";

export default function distributionMap(props) {
  return (
    <div>
      <Head>
        <title>Distribution Map - Possum Nest</title>

        {/* import map and map clustering */}
        <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
        <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js"></script>
        {/* <script src="https://cdn.jsdelivr.net/npm/@turf/turf@5/turf.min.js"></script> */}
      </Head>
      <NavigationBar currentPage='recordmap'/>
      <RecordMapWrapper />
    </div>
  )
}