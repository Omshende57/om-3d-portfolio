import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, carModel;

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.5, 4);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 1.2);
  spotLight.position.set(5, 10, 5);
  scene.add(spotLight);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;

  // Load Lamborghini-style car model
  const loader = new GLTFLoader();
  loader.load(
    'https://threejs.org/examples/models/gltf/Lamborghini_Aventador/glTF/Lamborghini_Aventador.gltf',
    (gltf) => {
      carModel = gltf.scene;
      carModel.scale.set(0.02, 0.02, 0.02);
      carModel.position.set(0, 0, 0);
      scene.add(carModel);
    },
    undefined,
    (error) => console.error('Error loading car model:', error)
  );

  // Resize handling
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (carModel) {
    carModel.rotation.y += 0.005; // slow rotation
  }
  controls.update();
  renderer.render(scene, camera);
}

init();
