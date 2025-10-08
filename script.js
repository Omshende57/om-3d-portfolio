import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 5);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Background Texture
const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load('https://threejs.org/examples/textures/cube/skyboxsun25deg/test.jpg');
scene.background = bgTexture;

// Load Lamborghini car model
const loader = new GLTFLoader();
let carModel;

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

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (carModel) {
    carModel.rotation.y += 0.01; // Rotate car slowly
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
