
var camera, cena, render, canvas;
var geometry, material, mesh;
var controles;
var objects = [];
var raycaster;
var ginasio = new Ginasio();
var objetosQuadra = new ObjetosQuadra();
var controlesMovimento = new Controles();

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

    //------------------------------BOLAS-------------------------------------

    for (var i = 0; i < 200; i++) {

        var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));


        object.position.x = Math.random() * 50 - 2;
        object.position.y = Math.random() * 8;
        object.position.z = Math.random() * 75 - 2;

        object.userData.velocity = new THREE.Vector3();
        object.userData.velocity.x = Math.random() * 0.01 - 0.005;
        object.userData.velocity.y = Math.random() * 0.01 - 0.005;
        object.userData.velocity.z = Math.random() * 0.01 - 0.005;

        quadra.add(object);

    }

    //-------------------------------------------------------------------

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

function movBalls() {
    var delta = clock.getDelta() * 0.8; // slow down simulation

    //Variável para delimitar o tamanho do alcance da física na quadra
    var range = 60 - radius;

    for (var i = 0; i < quadra.children.length; i++) {

        var object = quadra.children[i];

        object.position.x += object.userData.velocity.x * delta;
        object.position.y += object.userData.velocity.y * delta;
        object.position.z += object.userData.velocity.z * delta;

        // keep objects inside room
        //Raio de alcance das bolinhas
        if (object.position.x < - range || object.position.x > range) {

            object.position.x = THREE.Math.clamp(object.position.x, - range, range);
            object.userData.velocity.x = - object.userData.velocity.x;

        }

        if (object.position.y < radius || object.position.y > 6) {

            object.position.y = Math.max(object.position.y, radius);

            object.userData.velocity.x *= 0.98;
            object.userData.velocity.y = - object.userData.velocity.y * 0.8;
            object.userData.velocity.z *= 0.98;

        }

        if (object.position.z < - range || object.position.z > range) {

            object.position.z = THREE.Math.clamp(object.position.z, - range, range);
            object.userData.velocity.z = - object.userData.velocity.z;

        }
        
        for (var j = i + 1; j < quadra.children.length; j++) {

            var object2 = quadra.children[j];

            normal.copy(object.position).sub(object2.position);

            var distance = normal.length();

            if (distance < 2 * radius) {

                normal.multiplyScalar(0.5 * distance - radius);

                object.position.sub(normal);
                object2.position.add(normal);

                normal.normalize();

                relativeVelocity.copy(object.userData.velocity).sub(object2.userData.velocity);

                normal = normal.multiplyScalar(relativeVelocity.dot(normal));

                object.userData.velocity.sub(normal);
                object2.userData.velocity.add(normal);

            }

        }

        object.userData.velocity.y -= 9.8 * delta;

    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
}

function animacao() {
    movBalls();
    requestAnimationFrame(animacao);
    controlesMovimento.ativaMouse(controlesAtivado);
    render.render(cena, camera);
}
