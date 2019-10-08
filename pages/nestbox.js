import NavigationBar from '../components/NavigationBar.js';
import NestboxPlayground from '../components/NestboxPlayground.js';

export default function test(props) {
  return (
    <div>
      <NavigationBar currentPage='nestbox'/>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/108/three.min.js'></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js'></script>
      <script src='/static/threejs/threejs-controls/DragControls.js'></script>
      <script src='/static/threejs/threejs-controls/TrackballControls.js'></script>
      <script src='/static/threejs/threejs-controls/CSGMesh.js'></script>
      {/* <script src='/static/threejs/scene.js'></script> */}
      <NestboxPlayground />
    </div>
  );
}