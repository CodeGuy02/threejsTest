import './style.css'
import './public/css/main.css'
import * as THREE from 'three';
import { AmbientLight } from 'three';

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();

//const canvasArea = document.getElementById("heroAreaBackground");
const canvasWidth = document.getElementById("heroAreaBackground").clientWidth;
const canvasHeight = document.getElementById("heroAreaBackground").clientHeight;
console.log(canvasWidth);
console.log(canvasHeight);
//alert(width);
//alert(height);

// -----------------------------------------------------
const loader = new THREE.FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function(font) {
  const newText = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
});

//newText = new THREE.TextGeometry("testing: ");


//const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000);
const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
//renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setSize(canvasWidth, canvasHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({color: 0x226397, wireframe: true});
const material = new THREE.MeshStandardMaterial({color: 0x226397});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
//scene.add(newText);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
scene.add(pointLight, AmbientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.03;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
