
var camera, cena, render, canvas;
var geometry, material, mesh;
var controles;
var objects = [];
var raycaster;
var ginasio = new Ginasio();
var controlesMovimento = new Controles();

//Método para pausar a tela
var pause = new Pause();
pause.pauseMouse();

init();
animacao();
var controlesAtivado = false;
var movFrente = false;
var movTras = false;
var movEsquerda = false;
var movDireita = false;
var pular = false;
var prevTime = performance.now();
var velocidade = new THREE.Vector3();
function init() {
    //Câmera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    cena = new THREE.Scene();
    cena.fog = new THREE.Fog(0xffffff, 0, 750);
    //Luz
    var luz = ginasio.getLuz(0, 0, 2000);
    cena.add(luz);
    //Controles
    controles = new THREE.PointerLockControls(camera);
    cena.add(controles.getObject());
    var onKeyDown = controlesMovimento.keyDown();
    var onKeyUp = controlesMovimento.keyUp();
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
    //Quadra
    var quadra = ginasio.getQuadra(200,150);
    cena.add(quadra);
    //Render
    render = ginasio.getRender();
    render.setClearColor(0xffffff);
    render.setPixelRatio(window.devicePixelRatio);
    render.setSize(window.innerWidth, window.innerHeight);
    canvas = ginasio.getCanvas();
    document.body.appendChild(canvas);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
}

function animacao() {
    requestAnimationFrame(animacao);
    controlesMovimento.ativaMouse(controlesAtivado);
    render.render(cena, camera);
}
