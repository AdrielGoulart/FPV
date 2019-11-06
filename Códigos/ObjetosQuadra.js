class ObjetosQuadra {

    constructor() {
    }

    getTrave(posicao) {
        var poleGeo = new THREE.CylinderBufferGeometry(0.5, 0.5, 10, 64);
        var poleMat = new THREE.MeshLambertMaterial();
        var poste1 = new THREE.Mesh(poleGeo, poleMat);
        poste1.position.y = 5;
        poste1.position.z = -5;
        poste1.receiveShadow = true;
        poste1.castShadow = true;

        var poste2 = new THREE.Mesh(poleGeo, poleMat);
        poste2.position.y = 5;
        poste2.position.z = 8;
        poste2.receiveShadow = true;
        poste2.castShadow = true;

        var posteCima = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.5, 0.5, 13, 64), poleMat);
        posteCima.rotation.x = 1.57;
        posteCima.position.y = 9.5;
        posteCima.position.z = 1.5;
        posteCima.receiveShadow = true;
        posteCima.castShadow = true;

        var group = new THREE.Group();
        group.add(poste1);
        group.add(poste2);
        group.add(posteCima);
        group.position.x = posicao;
        group.receiveShadow = true;
        group.castShadow = true;

        return group;
    }

    getCesta(posicaoX, rotacao) {
        var poleGeo = new THREE.CylinderBufferGeometry(0.5, 0.5, 20, 64);
        var poleMat = new THREE.MeshPhongMaterial();
        var pilarSuporte = new THREE.Mesh(poleGeo, poleMat);
        pilarSuporte.position.x = -90;
        pilarSuporte.position.y = 10;
        pilarSuporte.position.z = 1.5;
        pilarSuporte.receiveShadow = true;
        pilarSuporte.castShadow = true;

        var poleGeo = new THREE.CylinderBufferGeometry(0.5, 0.5, 15, 64);
        var poleMat = new THREE.MeshPhongMaterial();
        var pilarSuporte2 = new THREE.Mesh(poleGeo, poleMat);
        pilarSuporte2.position.x = -83.5;
        pilarSuporte2.position.y = 23.5;
        pilarSuporte2.position.z = 1.5;
        pilarSuporte2.rotation.z = -1;
        pilarSuporte2.receiveShadow = true;
        pilarSuporte2.castShadow = true;

        var geometria = new THREE.PlaneGeometry(13, 10, 100, 100);
        geometria.rotateY(Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        var quadroCestaAtras = new THREE.Mesh(geometria, material);
        quadroCestaAtras.position.x = -76.9;
        quadroCestaAtras.position.y = 25;
        quadroCestaAtras.position.z = 1;
        quadroCestaAtras.receiveShadow = true;
        quadroCestaAtras.castShadow = true;

        var geometria = new THREE.PlaneGeometry(13, 10, 100, 100);
        geometria.rotateY(Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../imagens/quadroCesta.png') });
        var quadroCestaFrente = new THREE.Mesh(geometria, material);
        quadroCestaFrente.position.x = -76.8;
        quadroCestaFrente.position.y = 25;
        quadroCestaFrente.position.z = 1;
        quadroCestaFrente.receiveShadow = true;
        quadroCestaFrente.castShadow = true;

        var geometry = new THREE.CircleGeometry(2.5, 32);
        geometry.rotateX(Math.PI / 2);
        geometry.rotateY(Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../imagens/cesta.png'), side: THREE.DoubleSide, transparent: true });
        var cesta = new THREE.Mesh(geometry, material);
        cesta.position.x = -74.4;
        cesta.position.y = 21.5;
        cesta.position.z = 1;
        cesta.receiveShadow = true;
        cesta.castShadow = true;

        var group = new THREE.Group();
        group.add(pilarSuporte);
        group.add(pilarSuporte2);
        group.add(quadroCestaAtras);
        group.add(quadroCestaFrente);
        group.add(cesta);
        group.receiveShadow = true;
        group.castShadow = true;
        group.position.x = posicaoX;
        group.rotation.y = rotacao;
        return group;
    }

    getPlacar() {
        var geometria = new THREE.PlaneGeometry(13, 10, 100, 100);
        geometria.rotateY(Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../imagens/placar.png') });
        var placar = new THREE.Mesh(geometria, material);
        placar.position.y = 15;
        placar.rotation.y = -Math.PI / 2;
        placar.position.z = -74.8;
        placar.receiveShadow = true;
        placar.castShadow = true;
        return placar;
    }
}