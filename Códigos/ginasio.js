class Ginasio {

    constructor() {
        //Render 
        this.render = new THREE.WebGLRenderer({
            antialias: true
        });
        this.render.setSize(window.innerWidth, window.innerHeight);
        this.render.setClearColor(0x101010);

        //Shadow 
        this.render.shadowMap.enabled = true;
        this.render.shadowMap.type = THREE.BasicShadowMap;

        //Canvas 
        this.canvas = this.render.domElement;
    }

    getLuz(x, y, z) {
        this.luz = new THREE.AmbientLight(0x666666, 1);
        this.luz.position.set(x, y, z);
        return this.luz;
    }

    getQuadra(largura, altura) {
        //Quadra
        var geometria = new THREE.PlaneGeometry(largura, altura, 100, 100);
        geometria.rotateX(- Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('../imagens/quadra.png')
        });
        var quadra = new THREE.Mesh(geometria, material);
        quadra.receiveShadow = true;
        quadra.castShadow = true;
        return quadra;
    }

    getCobertura() {
        var geometry = new THREE.CylinderGeometry(88, 88, 201, 40, 1, false, 3.16, 3.1);
        var material = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
        var cobertura = new THREE.Mesh(geometry, material);
        cobertura.rotation.z = - 1.57;
        cobertura.position.y = 28;
        cobertura.position.z = 13;
        return cobertura;
    }

    getParede(largura, altura) {
        //Parede
        var geometria = new THREE.PlaneGeometry(largura, altura, 100, 100);
        var material = new THREE.MeshBasicMaterial({ color: 0xffd700 });
        var parede = new THREE.Mesh(geometria, material);
        parede.receiveShadow = true;
        parede.castShadow = true;
        return parede;
    }

    getPilares() {
        var geometry = new THREE.BoxGeometry(3, 30, 5);
        var material = new THREE.MeshPhongMaterial({ color: 0x808080 });
        var pilar = new THREE.Mesh(geometry, material);

        //Os 4 Pilares dos cantos do ginásio
        var pilar1 = pilar.clone();
        pilar1.position.y = 15;
        pilar1.position.z = -72.5;
        pilar1.position.x = -98.5;

        var pilar2 =  pilar.clone();
        pilar2.position.y = 15;
        pilar2.position.z = -72.5;
        pilar2.position.x = 98.5;

        var pilar3 =  pilar.clone();
        pilar3.position.y = 15;
        pilar3.position.z = 98.5;
        pilar3.position.x = 98.5;

        var pilar4 =  pilar.clone();
        pilar4.position.y = 15;
        pilar4.position.z = 98.5;
        pilar4.position.x = -98.5;

        //Os 2 pilares atrás do gol
        var pilar5 =  pilar.clone();
        pilar5.position.y = 15;
        pilar5.position.z = 13.55;
        pilar5.position.x = -98.5;

        var pilar6 =  pilar.clone();
        pilar6.position.y = 15;
        pilar6.position.z = 13.55;
        pilar6.position.x = 98.5;

        //Os 4 Pilares das paredes laterais
        var pilar7 =  pilar.clone();
        pilar7.position.x = 24.625;
        pilar7.position.y = 15;
        pilar7.position.z = -73.5;
        pilar7.rotation.y = 1.55;

        var pilar8 = pilar.clone(); 
        pilar8.position.y = 15;
        pilar8.position.z = -73.5;
        pilar8.rotation.y = 1.55;
        pilar8.position.x = -24.625;

        var pilar9 =  pilar.clone();
        pilar9.position.x = 24.625;
        pilar9.position.y = 15;
        pilar9.position.z = 99.5;
        pilar9.rotation.y = 1.55;

        var pilar10 =  pilar.clone();
        pilar10.position.y = 15;
        pilar10.position.z = 99.5;
        pilar10.rotation.y = 1.55;
        pilar10.position.x = -24.625;

        var pilares = new THREE.Group();
        pilares.add(pilar1);
        pilares.add(pilar2);
        pilares.add(pilar3);
        pilares.add(pilar4);
        pilares.add(pilar5);
        pilares.add(pilar6);
        pilares.add(pilar7);
        pilares.add(pilar8);
        pilares.add(pilar9);
        pilares.add(pilar10);
        pilares.receiveShadow = true;
        pilares.castShadow = true;

        return pilares;

    }

    getArquibancada() {
        //Azul
        var geometry = new THREE.BoxGeometry(200, 3, 4);
        var material = new THREE.MeshPhongMaterial({ color: 0x0582c4 });
        var arquibancada1 = new THREE.Mesh(geometry, material);
        arquibancada1.position.y = 1.5;
        arquibancada1.position.z = 75;

        //Vermelho
        var geometry = new THREE.BoxGeometry(200, 3, 4);
        var material = new THREE.MeshPhongMaterial({ color: 0x862616 });
        var arquibancada2 = new THREE.Mesh(geometry, material);
        arquibancada2.position.y = 4.5;
        arquibancada2.position.z = 79;

        var arquibancada3 = arquibancada1.clone();
        arquibancada3.position.y = 7.5;
        arquibancada3.position.z = 83;

        var arquibancada4 = arquibancada2.clone();
        arquibancada4.position.y = 10.5;
        arquibancada4.position.z = 87;

        var arquibancada5 = arquibancada1.clone();
        arquibancada5.position.y = 13.5;
        arquibancada5.position.z = 91;

        var arquibancada6 = arquibancada2.clone();
        arquibancada6.position.y = 16.5;
        arquibancada6.position.z = 95;

        var arquibancada7 = arquibancada1.clone();
        arquibancada7.position.y = 19.5;
        arquibancada7.position.z = 99;

        var group = new THREE.Group();
        group.add(arquibancada1);
        group.add(arquibancada2);
        group.add(arquibancada3);
        group.add(arquibancada4);
        group.add(arquibancada5);
        group.add(arquibancada6);
        group.add(arquibancada7);

        //Adicionando física
        objects.push(arquibancada1);
        objects.push(arquibancada2);
        objects.push(arquibancada3);
        objects.push(arquibancada4);
        objects.push(arquibancada5);
        objects.push(arquibancada6);
        objects.push(arquibancada7);

        group.receiveShadow = true;
        group.castShadow = true;
        return group;
    }

    getRender() {
        return this.render;
    }

    getCanvas() {
        return this.canvas;
    }

}