import { createApp } from 'vue'
import App from './App.vue'
import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

let camera, controls, scene, renderer;

const widthScene = 750;
const heightScene = 750;

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var isDragging = false;
var dragObject;
var pNormal = new THREE.Vector3(0, 1, 0);
var planeIntersect = new THREE.Vector3();
var pIntersect = new THREE.Vector3();
var plane = new THREE.Plane();
var shift = new THREE.Vector3();

var objects = [];

var canvas;
reset();

function reset() {
    init();
    animate();
}

export { reset };

function createObject(objectPath, materialPath, scene, x, y, scale = 1, objectReference) {

    let objLoader = new OBJLoader();
    let materialLoader = new MTLLoader();




    materialLoader.load(materialPath, (mtl) => {

        mtl.preload()

        objLoader.setMaterials(mtl)
        objLoader.load(objectPath, (object) => {

            object.receiveShadow = true
            object.castShadow = true

            object.scale.x = scale;
            object.scale.y = scale;
            object.scale.z = scale;

            object.position.x = x
            object.position.y = y

            objects[objectReference] = object;

            if (objectReference == 'moon')
                createMoonPanControl();

            if (objectReference != 'moon')
                scene.add(object)
        })
    });
}

// Pivot point
let earthAndMoon;
let pivotGroup;
function createMoonPanControl() {

    pivotGroup = new THREE.Group();
    earthAndMoon = new THREE.Object3D();
    earthAndMoon.add(objects.moon);

    pivotGroup.add(earthAndMoon)
    scene.add(pivotGroup);

    canvas.addEventListener('mousemove', function (e) {
        onMouseMove(e);
    }, false);
    canvas.addEventListener('mousedown', function (e) {
        onMouseDown(e);
    }, false);
    canvas.addEventListener('mouseup', function (e) {
        onMouseUp(e);
    }, false);

}


function createDirectionalLight() {

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.color.setHSL(1, 0, 1);
    dirLight.position.set(100, 150, 0);
    scene.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 10;
    dirLight.shadow.mapSize.height = 10;

    const d = -100;

    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;
}



function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    canvas = document.getElementById('canvas');

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(widthScene, heightScene);



    renderer.shadowMap.enabled = true;

    camera = new THREE.PerspectiveCamera(60, widthScene / heightScene, 1, 1000);
    camera.position.set(400, 200, 0);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 0;
    controls.maxDistance = 1500;
    controls.maxPolarAngle = Math.PI / 2;


    createObject('Earth/CHAHIN_EARTH.obj', 'Earth/CHAHIN_EARTH.mtl', scene, 0, 0, 2, 'earth');
    createObject('Sun/SUN.obj', 'Sun/SUN.mtl', scene, -170, 0, 90, 'sun');
    createObject('Moon/Moon.obj', 'Moon/Moon.mtl', scene, 30, 0, .15, 'moon');


    // Cone de LUZ - ativar somente quando alinhar
    // var geometry = new THREE.CylinderGeometry(5, 15, 80, 12);
    // //Yellow
    // var material = new THREE.MeshBasicMaterial({ color: '#ffff00', opacity: 0.3, transparent: true });
    // var cylinder = new THREE.Mesh(geometry, material);

    // cylinder.translateX(-75);
    // cylinder.rotateZ(4.80);


    // var geometryTotal = new THREE.CylinderGeometry(12, 12, 105, 12);
    // //Yellow
    // var materialTotal = new THREE.MeshBasicMaterial({ color: '#9b9b00', opacity: 0.3, transparent: true });
    // var cylinderTotal = new THREE.Mesh(geometryTotal, materialTotal);

    // cylinderTotal.translateX(-65);
    // cylinderTotal.rotateZ(4.75);
    // scene.add(cylinder);
    // scene.add(cylinderTotal);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
        'skyBox.jpg',
        () => {

            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;
            scene.background = texture;

        });

    createDirectionalLight();

    const ambientLight = new THREE.AmbientLight('white', 2);

    scene.add(ambientLight);
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = widthScene / heightScene;
    camera.updateProjectionMatrix();

    renderer.setSize(widthScene, heightScene);

}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();

}

function render() {
    renderer.render(scene, camera);
}

document.addEventListener("pointermove", event => {

    mouse.x = (event.clientX / widthScene) * 2 - 1;
    mouse.y = - (event.clientY / heightScene) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if (isDragging) {
        raycaster.ray.intersectPlane(plane, planeIntersect);
    }
});

var mouseDown = false,
    mouseX = 0,
    mouseY = 0;

function onMouseMove(evt) {
    if (!mouseDown) {
        return;
    }

    evt.preventDefault();

    var deltaX = evt.clientX - mouseX;
    var deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;

    rotateScene(deltaX, deltaY);
}

function onMouseDown(evt) {
    evt.preventDefault();
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function onMouseUp(evt) {
    evt.preventDefault();
    mouseDown = false;
}

function rotateScene(deltaX, deltaY) {
    if (dragObject) {
        pivotGroup.rotation.y -= deltaX / 100;
    }
}

document.addEventListener("pointerdown", () => {

    var intersects = raycaster.intersectObjects([objects.moon]);

    if (intersects.length > 0) {
        controls.enabled = false;
        pIntersect.copy(intersects[0].point);

        plane.setFromNormalAndCoplanarPoint(pNormal, pIntersect);
        shift.subVectors(intersects[0].object.position, intersects[0].point);

        isDragging = true;
        dragObject = intersects[0].object;
    }
});

document.addEventListener("pointerup", () => {
    isDragging = false;
    dragObject = null;
    controls.enabled = true;
});

createApp(App).mount('#app')
