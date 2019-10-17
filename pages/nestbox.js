import NavigationBar from '../components/NavigationBar.js';
import NestboxPlayground from '../components/NestboxPlayground.js';
import Hidden from '@material-ui/core/Hidden';
import { Typography, Dialog } from '@material-ui/core';
import NestboxIntro from '../nestbox/NestboxIntro.js';

export default function test(props) {
  return (
    <div style={{margin:0, position: 'realtive'}}>
      <NavigationBar currentPage='nestbox'/>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/108/three.min.js'></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js'></script>
      <script src='/static/threejs/threejs-controls/DragControls.js'></script>
      <script src='/static/threejs/threejs-controls/TrackballControls.js'></script>
      <script src='/static/threejs/threejs-controls/CSGMesh.js'></script>
      <NestboxPlayground />
      <Hidden smDown>
      <div style={{position: 'absolute', right: 0, top: '15%', backgroundColor: 'white', padding: '6px'}}>
        <img src='/static/img/nestbox-tutorial.png' style={{width: '30vw'}}/>
        <Typography variant='h5' align='center'>Material you need</Typography>
      </div>
      </Hidden>
      <NestboxIntro />
    </div>
  );
}