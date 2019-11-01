"use strict";
//Cena
var cena = new THREE.Scene();

var prevTime = performance.now();
var velocity = new THREE.Vector3();

//Câmera
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
//Posição da câmera
camera.position.set(0, 0, 300);
camera.rotation.x = 1.2;

//Inicialização do Canvas
var ginasio = new Ginasio();
var render = ginasio.getRender();
var canvas = ginasio.getCanvas();
document.body.appendChild(canvas);

//Luz
var luz = ginasio.getLuz(0, 0, 2000);
cena.add(luz);

//Controles
var controles = new THREE.OrbitControls( camera, render.domElement );

//Quadra
var quadra = ginasio.getQuadra(2000, 1500);
quadra.position.set(0, 0, 0);
cena.add(quadra);

function desenhar() {
 
    requestAnimationFrame(desenhar);
    render.render(cena, camera);
}

requestAnimationFrame(desenhar);