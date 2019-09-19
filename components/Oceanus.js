import Head from 'next/head';
import { Scene, PerspectiveCamera, WebGLRenderer, SpriteMaterial, Sprite } from 'three';
import OrbitControls from 'three-orbitcontrols';
import { useEffect } from 'react';

export default function Oceanus(props) {
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, width / height, 0.1, 800);
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 200;
    camera.lookAt(scene.position);

    const renderer = new WebGLRenderer({ antialias: true });

    renderer.setClearColor(0x000000);
    renderer.setSize(width, height);

    document.body.appendChild(renderer.domElement);
    
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = true;
    
    const spriteMaterial = new SpriteMaterial({color: 0x6b7b69});
    for (let x = -5; x < 5; x++) {
      for (let y = -5; y < 5; y++) {
        let sprite = new Sprite(spriteMaterial);
        sprite.position.set(x * 10, y * 10, 0);
        scene.add(sprite);
      }
    }

    render()

    function render() {
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }

  }, [])

  return <div></div>;
}