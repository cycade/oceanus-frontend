let camera, controls, scene, renderer, stats;
let objects = [];

// CSG util method
const makeCSG = function(a, b, op, mat) {
  let bspA = CSG.fromMesh(a), bspB = CSG.fromMesh(b), bspC = bspA[op](bspB);
  let result = CSG.toMesh(bspC, a.matrix);
  result.material = mat;
  result.castShadow = result.receiveShadow = true;
  return result;
}

const getDistance = function(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
}

function init() {
  // Initialize camera
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 500;

  // Initialzie world
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);
  scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

  // add sample plane
  let frontPlaneGeometry = new THREE.BoxGeometry(23, 55, 0.7);
  let frontPlaneMaterial = new THREE.MeshPhysicalMaterial({ color: 0x6b7b69 });
  let frontPlane = new THREE.Mesh(frontPlaneGeometry, frontPlaneMaterial);

  let fixedhole = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 3, 32));
  fixedhole.rotateX(Math.PI / 2);
  fixedhole.position.add(new THREE.Vector3(0, 25, 0));
  fixedhole.updateMatrix();

  let tot = makeCSG(frontPlane, fixedhole, 'subtract', frontPlane.material);
  fixedhole.position.add(new THREE.Vector3(0, -50, 0));
  fixedhole.updateMatrix();
  let tot2 = makeCSG(tot, fixedhole, 'subtract', frontPlane.material);

  scene.add(tot2);
  objects.push(tot2);

  let groups = new THREE.Object3D();
  let topBasepoint = new THREE.Points(new THREE.BoxGeometry(23, 0.7, 19.6), new THREE.PointsMaterial({ color: 0x0080ff, size: 1}));
  topBasepoint.position.add(new THREE.Vector3(10, 1, 20));
  groups.add(topBasepoint);

  let topGeometry = new THREE.BoxGeometry(23, 0.7, 19.6);
  let topMaterial = new THREE.MeshPhysicalMaterial({ color: 0x6b7b69 });
  let top = new THREE.Mesh(topGeometry, topMaterial);
  groups.add(top);
  scene.add(groups);
  objects.push(groups);

  // lights
  let light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);
  light = new THREE.DirectionalLight(0x002288);
  light.position.set(-100, -100, -100);
  scene.add(light);
  light = new THREE.AmbientLight(0x222222);
  scene.add(light);

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // add trackball control
  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  // add drag control
  let dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

  dragControls.addEventListener('dragstart', function () {
    controls.enabled = false;
  });

  dragControls.addEventListener('drag', function (e) {
    let current = e.object.position.clone();
    let topWorldCoord = top.position.clone();
    
    if (getDistance(current.project(camera), topWorldCoord.project(camera)) < 0.2) {
      e.object.position.set(top.position.x, top.position.y, top.position.z);
      e.object.updateMatrix();
    }
  });

  dragControls.addEventListener('dragend', function () {
    controls.enabled = true;
  });

  // add performance stat tool
  stats = new Stats();
  document.body.appendChild(stats.domElement);

  // rerender when resizing
  window.addEventListener('resize', onWindowResize, false);
  render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
  render();
}

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
  controls.update();
  stats.update();
}

init();
render();