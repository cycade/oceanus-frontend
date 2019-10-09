import { useEffect, useState } from "react";
import { Snackbar, Typography, Button } from "@material-ui/core";

export default function(props) {
  const [completed, setComplete] = useState(false);

  useEffect(() => {
    let camera, controls, scene, renderer, stats;
    let boards = [], edges = new Map();
    let planeColor = 0x6b7b69, distanceLimit = 0.08;
    let combination = new Set();

    // CSG util method
    const makeCSG = function(a, b, op, mat) {
      let bspA = CSG.fromMesh(a), bspB = CSG.fromMesh(b), bspC = bspA[op](bspB);
      let result = CSG.toMesh(bspC, a.matrix);
      result.material = mat;
      result.castShadow = result.receiveShadow = true;
      return result;
    }

    const makeBoard = function(geometry, location, rotation) {
      let planeGeometry = new THREE.BoxGeometry(...geometry);
      let texture = THREE.ImageUtils.loadTexture("/static/img/material.png");
      let planeMaterial = new THREE.MeshLambertMaterial({
        map:texture,
        side:THREE.DoubleSide,
      });

      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      if (location !== undefined) {
        plane.position.add(new THREE.Vector3(...location));
        plane.updateMatrix();
      }
      if (rotation !== undefined) {
        if (rotation[0] > 0) { plane.rotateX(Math.PI * rotation[0] / 180); }
        if (rotation[1] > 0) { plane.rotateY(Math.PI * rotation[1] / 180); }
        if (rotation[2] > 0) { plane.rotateZ(Math.PI * rotation[2] / 180); }
        plane.updateMatrix();
      }
      return plane;
    }

    const makeBackBoard = function(location) {
      let basePlane = makeBoard([23, 55, 1], location);

      let fixedhole = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 3, 32));
      fixedhole.rotateX(Math.PI / 2);
      fixedhole.position.add(new THREE.Vector3(...location));
      fixedhole.position.add(new THREE.Vector3(0, 25, 0));
      fixedhole.updateMatrix();

      let prePlane = makeCSG(basePlane, fixedhole, 'subtract', basePlane.material);
      fixedhole.position.add(new THREE.Vector3(0, -50, 0));
      fixedhole.updateMatrix();

      return makeCSG(prePlane, fixedhole, 'subtract', prePlane.material);
    }

    const makeSideBoard = function(location, right=false) {
      let basePlane = makeBoard([1, 40, 22], location);

      let dividend = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 30));
      dividend.rotateX(6/180*Math.PI);
      dividend.position.add(new THREE.Vector3(...location));
      dividend.position.add(new THREE.Vector3(0, 20.25, 0));
      dividend.updateMatrix();

      let sideBoard = makeCSG(basePlane, dividend, 'subtract', basePlane.material);
      if (right) {
        let fixedhole = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 3, 32));
        fixedhole.rotateZ(Math.PI / 2);
        fixedhole.position.add(new THREE.Vector3(...location));
        fixedhole.position.add(new THREE.Vector3(0, -15, -7));
        fixedhole.updateMatrix();

        return makeCSG(sideBoard, fixedhole, 'subtract', sideBoard.material);
      }
      return sideBoard;
    }

    const getDistance = function(p1, p2) {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
    }

    function init() {
      // Initialize camera
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.y = 10;
      camera.position.z = window.innerWidth / 6.5;

      // Initialzie world
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xcccccc);
      scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

      // add sample plane
      let backBoard = makeBackBoard([0, 0, 0]);
      scene.add(backBoard);
      boards.push(backBoard);
      combination.add(backBoard);

      let baseBoard = makeBoard([23, 1, 20], [-120, 50, 0]);
      scene.add(baseBoard);
      boards.push(baseBoard);

      let frontBoard = makeBoard([23, 38, 1], [-160, -50, 0]);
      scene.add(frontBoard);
      boards.push(frontBoard);

      let rightBoard = makeSideBoard([-120, 0, 0], true)
      scene.add(rightBoard);
      boards.push(rightBoard);

      let lidBoard = makeBoard([23, 1, 26], [-160, 50, 0], [6, 0, 0]);
      scene.add(lidBoard);
      boards.push(lidBoard);

      let leftBoard = makeSideBoard([-160, 0, 0])
      scene.add(leftBoard);
      boards.push(leftBoard);

      edges.set(backBoard, new Map([
        [baseBoard, [0, -19.5, 10]],
        [lidBoard, [0, 19.25, 12.92]],
        [rightBoard, [11, 0, 11]],
        [leftBoard, [-11, 0, 11]],
      ]));
      
      edges.set(lidBoard, new Map([
        [backBoard, [0, -19.25, -12.92]],
      ]))

      edges.set(baseBoard, new Map([
        [backBoard, [0, 19.5, -10]],
        [frontBoard, [0, 19, 9.5]],
      ]));

      edges.set(leftBoard, new Map([
        [backBoard, [11, 0, -11]],
      ]))

      edges.set(rightBoard, new Map([
        [backBoard, [-11, 0, -11]],
      ]))

      edges.set(frontBoard, new Map([
        [baseBoard, [0, -19, -9.5]],
      ]))

      // lights
      let light = new THREE.DirectionalLight(0xffffff);
      light.position.set(1, 1, 1);
      scene.add(light);
      light = new THREE.DirectionalLight(0x002288);
      light.position.set(-100, -100, -100);
      scene.add(light);
      light = new THREE.AmbientLight(0x222222);
      scene.add(light);
      light = new THREE.DirectionalLight(0x002288);
      light.position.set(-50, 50, 20);
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
      let dragControls = new THREE.DragControls(boards, camera, renderer.domElement);

      dragControls.addEventListener('dragstart', function () {
        controls.enabled = false;
      });

      dragControls.addEventListener('drag', function (e) {
        let current = e.object.position, foundNearest = false;
        if (!edges.has(e.object)) { return; }
        for (let [item, vec] of edges.get(e.object)) {
          let currentPosition = current.clone().add(new THREE.Vector3(...vec));
          let targetPosition = item.position.clone();
          if (getDistance(currentPosition.project(camera), targetPosition.project(camera)) < distanceLimit) {
            foundNearest = true;
            current.set(item.position.x - vec[0], item.position.y - vec[1], item.position.z - vec[2]);
            e.object.updateMatrix();
            if (e.object !== backBoard && item === backBoard) { combination.add(e.object); }
            if (e.object === backBoard && item !== backBoard) { combination.add(item); }
            if (combination.has(baseBoard) && e.object === frontBoard) { combination.add(e.object); }
            break;
          }
          if (!foundNearest && e.object !== backBoard && combination.has(e.object)) { combination.delete(e.object); }
        }

        setComplete(combination.size === 6);
      });

      dragControls.addEventListener('dragend', function () {
        controls.enabled = true;
      });

      // add performance stat tool
      // stats = new Stats();
      // document.body.appendChild(stats.domElement);

      // rerender when resizing
      window.addEventListener('resize', onWindowResize, false);
      render();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight*0.99;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight*0.99);
      controls.handleResize();
      render();
    }

    function render() {
      camera.aspect = window.innerWidth / window.innerHeight*0.99;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight*0.99);
      renderer.render(scene, camera)
      requestAnimationFrame(render)
      controls.update();
      // stats.update();
    }

    init();
    render();
  },[])

  return <div>
    <Snackbar
      open={completed}
      message={<Typography variant='h5'>Congratulations!</Typography>}
      action={<Button color='inherit' href='/'>Learn more</Button>}
    />

  </div>;
}