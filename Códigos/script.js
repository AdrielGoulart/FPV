
var camera, cena, render, canvas;
var geometry, material, mesh;
var controles;
var objects = [];
var raycaster;
var ginasio = new Ginasio();
var objetosQuadra = new ObjetosQuadra();
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

    // Testando sombras - Parcialmente implementada, tentar suavizar sombra, sombra mt quadrada
    var light = new THREE.DirectionalLight(0xdfebff, 1);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);
    light.castShadow = true;
    light.shadow.mapSize.width = window.innerWidth;
    light.shadow.mapSize.height = window.innerHeight;
    var d = 80;
    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;
    light.shadow.camera.far = 1000;
    cena.add(light);
    // Fim teste luz e sombra
    
    //Controles
    controles = new THREE.PointerLockControls(camera);
    cena.add(controles.getObject());
    var onKeyDown = controlesMovimento.keyDown();
    var onKeyUp = controlesMovimento.keyUp();
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
    //Quadra
    var quadra = ginasio.getQuadra(200, 150);
    cena.add(quadra);

    //Paredes
    //Parede lado quadra sem arquibancada
    var parede1 = ginasio.getParede(200, 30);
    parede1.position.z = -75;
    parede1.position.y = 15;
    cena.add(parede1);
    //Parede atrás do gol esquerdo
    var parede2 = ginasio.getParede(176, 30);
    parede2.rotation.y = 1.57;
    parede2.position.x = -100;
    parede2.position.y = 15;
    parede2.position.z = 13;
    cena.add(parede2);
    //Parede atrás do gol direito
    var parede3 = ginasio.getParede(176, 30);
    parede3.rotation.y = -1.57;
    parede3.position.x = 100;
    parede3.position.y = 15;
    parede3.position.z = 13;
    cena.add(parede3);
    //Parede lado quadra com arquibancada
    var parede4 = ginasio.getParede(200, 30);
    parede4.rotation.y = 3.142;
    parede4.position.z = 101;
    parede4.position.y = 15;
    cena.add(parede4);

    //Arquibancada
    var arquibancada = ginasio.getArquibancada();
    cena.add(arquibancada);

    //Cobertura
    var cobertura = ginasio.getCobertura();
    cena.add(cobertura);

    //Pilares da quadra
    var pilares = ginasio.getPilares();
    cena.add(pilares);

    // Traves
    trave1 = objetosQuadra.getTrave(-82.5);
    cena.add(trave1);
    var trave2 = objetosQuadra.getTrave(82.5);
    cena.add(trave2);

    //Render
    render = ginasio.getRender();
    //render.setClearColor(0xffffff);
    render.setPixelRatio(window.devicePixelRatio);
    render.setSize(window.innerWidth, window.innerHeight);
    canvas = ginasio.getCanvas();
    // Enable Shadows
    render.shadowMap.enabled = true;
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
