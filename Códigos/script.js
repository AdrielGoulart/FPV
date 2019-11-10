
var camera, cena, render, canvas;
var geometry, material, mesh;
var controles;
var objects = [];
var raycaster;
var ginasio = new Ginasio();
var objetosQuadra = new ObjetosQuadra();
var controlesMovimento = new Controles();
var bolas = [];
var antes = performance.now();

var clock = new THREE.Clock();
var time = 0;
var delta = 0;
//Bola
var count = 0;
var radius = 0.08;
var normal = new THREE.Vector3();
var relativeVelocity = new THREE.Vector3();
var clock = new THREE.Clock();
var geometry = new THREE.IcosahedronBufferGeometry(0.5, 2);

//
var quadra = ginasio.getQuadra(200, 150);

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
    camera.position.set(0, 7, 0);
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

    objetosQuadra.getSom();

    //Controles
    controles = new THREE.PointerLockControls(camera);
    cena.add(controles.getObject());
    var onKeyDown = controlesMovimento.keyDown();
    var onKeyUp = controlesMovimento.keyUp();
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
    //Quadra
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

    //TCestas de basquete
    var cesta1 = objetosQuadra.getCesta(0, 0);
    cena.add(cesta1);
    var cesta2 = objetosQuadra.getCesta(0, 3.1);
    cena.add(cesta2);

    //Placar digital
    var placar = objetosQuadra.getPlacar();
    cena.add(placar);

    //Grades de proteção
    objetosQuadra.getGrades();

    //Banco
    objetosQuadra.getBancos();

    //Adicionando a porta
    var porta = ginasio.getPorta();
    cena.add(porta);

    // Bolas da quadra
    var bolaGeometria = new THREE.SphereBufferGeometry(1, 32, 32);

    //Nesse for define quantas bolas serão criadas e adiciona na cena
    for (var i = 0; i < 500; i++) {
        var numero =  Math.random() * (1 - 0) + 0;
        if(numero < 0.5){  
            var bolaMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../imagens/futebol.png'),specular: 0xffffff, flatShading: true});
            var box = new THREE.Mesh(bolaGeometria, bolaMaterial);
        }else{
            var bolaMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../imagens/basquete.png'),specular: 0xffffff, flatShading: true});
            var box = new THREE.Mesh(bolaGeometria, bolaMaterial);
        }
        
        box.receiveShadow = true;
        box.castShadow = true;
        box.position.x = (Math.random() * 12.8 - 6.5) * 12.8;
        box.position.y = (Math.random() * 10) * 10 + 5;
        box.position.z = (Math.random() * 11 - 5.4) * 10;
        cena.add(box);
        bolas.push(box);
    }

    //Render
    render = ginasio.getRender();
    //render.setClearColor(0xffffff);
    render.setPixelRatio(window.devicePixelRatio);
    render.setSize(window.innerWidth, window.innerHeight);
    canvas = ginasio.getCanvas();
    // Enable Shadows
    render.shadowMap.enabled = true;
    render.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(canvas);

    window.addEventListener('resize', onWindowResize, false);
}

function movBolas() {
    //Movimento das bolas
    if (controlesAtivado) {
        for (var i = 0; i < bolas.length; i++) {
            delta = clock.getDelta();
            time += delta;
            if (i < 250) {
               // bolas[3].position.y = 1 + Math.abs(Math.sin(time * 3)) * 15;
                //bolas[3].position.x = Math.cos(time) * 70;
                bolas[i].position.y = 1 + Math.abs(Math.sin(time * 3)) * 15;
            } else {
                //bolas[2].position.y = 1 + Math.abs(Math.sin(time * 3)) * 25;
                bolas[i].position.y = 1 + Math.abs(Math.sin(time * 3)) * 25;
                //bolas[2].position.z = Math.cos(time) * 70;
            }
        }
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
}

function animacao() {
    movBolas();
    requestAnimationFrame(animacao);
    controlesMovimento.ativaMouse(controlesAtivado);
    render.render(cena, camera);
}
