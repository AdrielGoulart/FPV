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

    getGrades() {
        var posicao = 91.5;
        for (let i = 0; i < 14; i++) {
            var poleGeo = new THREE.CylinderBufferGeometry(0.2, 0.2, 5, 64);
            var poleMat = new THREE.MeshLambertMaterial();
            var poste1 = new THREE.Mesh(poleGeo, poleMat);
            poste1.position.y = 3;
            poste1.position.z = -5;
            poste1.receiveShadow = true;
            poste1.castShadow = true;

            var poste2 = new THREE.Mesh(poleGeo, poleMat);
            poste2.position.y = 3;
            poste2.position.z = 8;
            poste2.receiveShadow = true;
            poste2.castShadow = true;

            var posteCima = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0.2, 13, 64), poleMat);
            posteCima.rotation.x = 1.57;
            posteCima.position.y = 5.3;
            posteCima.position.z = 1.5;
            posteCima.receiveShadow = true;
            posteCima.castShadow = true;

            var geometria = new THREE.PlaneGeometry(13, 5, 100, 100);
            geometria.rotateY(Math.PI / 2);
            var material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('../imagens/grade.png'), transparent: true, side: THREE.DoubleSide });
            var grade = new THREE.Mesh(geometria, material);
            grade.position.y = 3;
            grade.position.z = 1.5;
            grade.receiveShadow = true;
            grade.castShadow = true;

            var group = new THREE.Group();
            group.add(poste1);
            group.add(poste2);
            group.add(posteCima);
            group.add(grade);
            group.position.x = 0;
            group.receiveShadow = true;
            group.castShadow = true;
            group.rotation.y = Math.PI / 2;
            group.position.x = posicao;
            group.position.z = 65;
            posicao -= 13.5;
            cena.add(group);
        }
    }

    getBancos() {
        var geometry = new THREE.BoxGeometry(20, 0.5, 3.5);
        var material = new THREE.MeshPhongMaterial({ color: 0x0582c4 });
        var banco = new THREE.Mesh(geometry, material);
        banco.position.y = 2;
        banco.receiveShadow = true;
        banco.castShadow = true;

        var poleGeo = new THREE.CylinderBufferGeometry(0.2, 0.2, 2, 64);
        var poleMat = new THREE.MeshLambertMaterial();
        var perna1 = new THREE.Mesh(poleGeo, poleMat);
        perna1.position.y = 1;
        perna1.position.x = 9.8;
        perna1.position.z = -1.52;
        perna1.receiveShadow = true;
        perna1.castShadow = true;

        var perna2 = perna1.clone();
        perna2.position.z = 1.52;
        perna2.receiveShadow = true;
        perna2.castShadow = true;

        var perna3 = perna1.clone();
        perna3.position.x = -9.8;
        perna3.receiveShadow = true;
        perna3.castShadow = true;

        var perna4 = perna1.clone();
        perna4.position.x = -9.8;
        perna4.position.z = 1.52;
        perna4.receiveShadow = true;
        perna4.castShadow = true;

        var banco1 = new THREE.Group();
        banco1.add(banco);
        banco1.add(perna1);
        banco1.add(perna2);
        banco1.add(perna3);
        banco1.add(perna4);
        banco1.position.z = -65;
        banco1.position.x = -23;
        banco1.receiveShadow = true;
        banco1.castShadow = true;

        var banco2 = banco1.clone();
        banco2.position.z = -65;
        banco2.position.x = 23;
        cena.add(banco1);
        cena.add(banco2);
    }
}