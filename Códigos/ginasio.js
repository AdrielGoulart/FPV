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
        //var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var quadra = new THREE.Mesh(geometria, material);
        quadra.receiveShadow = true;
        quadra.castShadow = true;
        return quadra;
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
        group.add( arquibancada1 );
        group.add( arquibancada2 );
        group.add( arquibancada3 );
        group.add( arquibancada4);
        group.add( arquibancada5 );
        group.add( arquibancada6 );
        group.add( arquibancada7 );
        
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