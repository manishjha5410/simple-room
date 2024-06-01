const container = document.querySelector('#scene-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const roomSize = Math.sqrt(2000);

const floorGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = - Math.PI / 2;
scene.add(floor);

function createObject() {
    const geometry = new THREE.BoxGeometry(Math.random() * 5, Math.random() * 5, Math.random() * 5);
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const object = new THREE.Mesh(geometry, material);

    object.position.x = (Math.random() - 0.5) * roomSize;
    object.position.y = geometry.parameters.height / 2;
    object.position.z = (Math.random() - 0.5) * roomSize;

    scene.add(object);
}

for (let i = 0; i < (Math.floor(Math.random() * 10)+20); i++) {
    createObject();
}

camera.position.y = 50;
camera.position.z = roomSize / 2;

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 50, 10);
scene.add(pointLight);

const controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
});
