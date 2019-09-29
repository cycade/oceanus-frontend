// import { Scene, PerspectiveCamera, WebGLRenderer, SpriteMaterial, Sprite, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
// import OrbitControls from 'three-orbitcontrols';
// import DragControls from 'three-dragcontrols';
// import TrackballControls from 'three-trackballcontrols';

// const width = window.innerWidth;
// const height = window.innerHeight;

// const scene = new Scene();
// const camera = new PerspectiveCamera(45, width / height, 0.1, 800);
// camera.position.x = 0;
// camera.position.y = 10;
// camera.position.z = 200;
// camera.lookAt(scene.position);

// const renderer = new WebGLRenderer({ antialias: true });

// renderer.setClearColor(0x000000);
// renderer.setSize(width, height);

// document.body.appendChild(renderer.domElement);

// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.autoRotate = true;

// const spriteMaterial = new SpriteMaterial({color: 0x6b7b69});
// for (let x = -5; x < 5; x++) {
//   for (let y = -5; y < 5; y++) {
//     let sprite = new Sprite(spriteMaterial);
//     sprite.position.set(x * 10, y * 10, 0);
//     scene.add(sprite);
//   }
// }

// let frontPlaneGeometry = new BoxGeometry(80, 80, 1);
// let frontPlaneMaterial = new MeshBasicMaterial({ color: 0xffff45 });
// let frontPlane = new Mesh(frontPlaneGeometry, frontPlaneMaterial);
// scene.add(frontPlane);

// // let controls = new TrackballControls( camera, renderer.domElement );
// // controls.rotateSpeed = 1.0;
// // controls.zoomSpeed = 1.2;
// // controls.panSpeed = 0.8;
// // controls.noZoom = false;
// // controls.noPan = false;
// // controls.staticMoving = true;
// // controls.dynamicDampingFactor = 0.3;

// const dragcontrols = new DragControls([frontPlane], camera, renderer.domElement);
// dragcontrols.addEventListener('dragstart', () => {
//   // controls.enabled = false;
// });
// dragcontrols.addEventListener('dragend', () => {
//   // controls.enabled = true;
// })

// render()

// function render() {
//   renderer.render(scene, camera)
//   requestAnimationFrame(render)
// }



var camera, controls, scene, renderer, stats;
let objects = [];
init();
render();

function init() {
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 500;
  // world
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
  var geometry = new THREE.CylinderBufferGeometry( 0, 10, 30, 4, 1 );
  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

  for ( var i = 0; i < 500; i ++ ) {
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = ( Math.random() - 0.5 ) * 1000;
    mesh.position.y = ( Math.random() - 0.5 ) * 1000;
    mesh.position.z = ( Math.random() - 0.5 ) * 1000;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = true;
    scene.add( mesh );
    objects.push(mesh);
  }

  // let frontPlaneGeometry = new THREE.BoxGeometry(80, 80, 1);
  // let frontPlaneMaterial = new THREE.MeshBasicMaterial({ color: 0xffff45 });
  // let frontPlane = new THREE.Mesh(frontPlaneGeometry, frontPlaneMaterial);
  // scene.add(frontPlane);

  // lights
  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );
  var light = new THREE.DirectionalLight( 0x002288 );
  light.position.set( - 1, - 1, - 1 );
  scene.add( light );
  var light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );

  // renderer
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  // controls.keys = [ 65, 83, 68 ];
  // controls.addEventListener( 'change', render );


  var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
  dragControls.addEventListener( 'dragstart', function () {
    controls.enabled = false;
  } );
  dragControls.addEventListener( 'dragend', function () {
    controls.enabled = true;
  } );

  stats = new Stats();
  document.body.appendChild( stats.domElement );

  window.addEventListener( 'resize', onWindowResize, false );

  render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
  render();
}

// function animate() {
//   requestAnimationFrame( animate );
//   controls.update();
//   stats.update();
// }

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
  controls.update();
  stats.update();

}
