class ObjetosQuadra {

    constructor() {
    }

    getTrave(posicao) {
        var poleGeo = new THREE.CylinderBufferGeometry(0.5, 0.5, 10, 64);
        var poleMat = new THREE.MeshLambertMaterial();
        var poste1 = new THREE.Mesh(poleGeo, poleMat);
        //poste1.position.x = - 82.5;
        poste1.position.y = 5;
        poste1.position.z = -5;
        poste1.receiveShadow = true;
        poste1.castShadow = true;

        var poste2 = new THREE.Mesh(poleGeo, poleMat);
        //poste2.position.x = - 82.5;
        poste2.position.y = 5;
        poste2.position.z = 8;
        poste2.receiveShadow = true;
        poste2.castShadow = true;

        var posteCima = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.5, 0.5, 13, 64), poleMat);
        posteCima.rotation.x = 1.57;
        posteCima.position.y = 9.5;
        //posteCima.position.x = - 82.5;
        posteCima.position.z = 1.5;
        posteCima.receiveShadow = true;
        posteCima.castShadow = true;

        var group = new THREE.Group();
        group.add( poste1 );
        group.add( poste2 );
        group.add( posteCima );
        group.position.x = posicao;
        group.receiveShadow = true;
        group.castShadow = true;

        return group;

    }
}