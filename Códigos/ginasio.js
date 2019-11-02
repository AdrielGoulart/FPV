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
            map: new THREE.TextureLoader().load('../imagens/quadra2.png')
        });
        //var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var quadra = new THREE.Mesh(geometria, material);
        quadra.receiveShadow = true;
        quadra.castShadow = true;
        return quadra;
    }

    getRender() {
        return this.render;
    }

    getCanvas() {
        return this.canvas;
    }

}