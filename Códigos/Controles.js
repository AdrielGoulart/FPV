class Controles{
    constructor() {
    }

    keyDown(){
        return function (event) {
            switch (event.keyCode) {
                case 38: // frente
                case 87: // w
                    movFrente = true;
                    break;
                case 37: // esquerda
                case 65: // a
                    movEsquerda = true; break;
                case 40: // atrás
                case 83: // s
                    movTras = true;
                    break;
                case 39: // direita
                case 68: // d
                    movDireita = true;
                    break;
                case 32: // espaço
                    if (pular === true) velocidade.y += 200;
                    pular = false;
                    break;
            }
        };
    }

    keyUp(){
        return function (event) {
            switch (event.keyCode) {
                case 38: // up
                case 87: // w
                    movFrente = false;
                    break;
                case 37: // left
                case 65: // a
                    movEsquerda = false;
                    break;
                case 40: // down
                case 83: // s
                    movTras = false;
                    break;
                case 39: // right
                case 68: // d
                    movDireita = false;
                    break;
            }
        };
    }

    ativaMouse(controlesAtivado){
        if (controlesAtivado) {
            raycaster.ray.origin.copy(controles.getObject().position);
            raycaster.ray.origin.y -= 10;
            var intersections = raycaster.intersectObjects(objects);
            var isOnObject = intersections.length > 0;
            var time = performance.now();
            var delta = (time - prevTime) / 1000;
            velocidade.x -= velocidade.x * 10.0 * delta;
            velocidade.z -= velocidade.z * 10.0 * delta;
            velocidade.y -= 9.8 * 100.0 * delta; // 100.0 = mass
            if (movFrente) velocidade.z -= 400.0 * delta;
            if (movTras) velocidade.z += 400.0 * delta;
            if (movEsquerda) velocidade.x -= 400.0 * delta;
            if (movDireita) velocidade.x += 400.0 * delta;
            if (isOnObject === true) {
                velocidade.y = Math.max(0, velocidade.y);
                pular = true;
            }
            controles.getObject().translateX(velocidade.x * delta);
            controles.getObject().translateY(velocidade.y * delta);
            controles.getObject().translateZ(velocidade.z * delta);
            if (controles.getObject().position.y < 10) {
                velocidade.y = 0;
                controles.getObject().position.y = 10;
                pular = true;
            }
            prevTime = time;
        }
    }
}