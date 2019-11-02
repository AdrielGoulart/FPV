class Pause {

    constructor() {
    }
    
    pauseMouse() {
        var bloqueado = document.getElementById('bloqueado');
        var instrucoes = document.getElementById('instrucoes');
        var bloqueioPonteiro = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
        if (bloqueioPonteiro) {
            var element = document.body;
            var pointerlockchange = function (event) {
                if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
                    controlesAtivado = true;
                    controles.enabled = true;
                    bloqueado.style.display = 'none';
                } else {
                    controles.enabled = false;
                    bloqueado.style.display = '-webkit-box';
                    bloqueado.style.display = '-moz-box';
                    bloqueado.style.display = 'box';
                    instrucoes.style.display = '';
                }
            };
            var pointerlockerror = function (event) {
                instrucoes.style.display = '';
            };
            // Eventos de alteração de estado de bloqueio do ponteiro de gancho
            document.addEventListener('pointerlockchange', pointerlockchange, false);
            document.addEventListener('mozpointerlockchange', pointerlockchange, false);
            document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
            document.addEventListener('pointerlockerror', pointerlockerror, false);
            document.addEventListener('mozpointerlockerror', pointerlockerror, false);
            document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
            instrucoes.addEventListener('click', function (event) {
                instrucoes.style.display = 'none';
                // Pede ao navegador para bloquear o ponteiro
                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
                if (/Firefox/i.test(navigator.userAgent)) {
                    var fullscreenchange = function (event) {
                        if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
                            document.removeEventListener('fullscreenchange', fullscreenchange);
                            document.removeEventListener('mozfullscreenchange', fullscreenchange);
                            element.requestPointerLock();
                        }
                    };
                    document.addEventListener('fullscreenchange', fullscreenchange, false);
                    document.addEventListener('mozfullscreenchange', fullscreenchange, false);
                    element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
                    element.requestFullscreen();
                } else {
                    element.requestPointerLock();
                }
            }, false);
        } else {
            instrucoes.innerHTML = 'Seu navegador parece não suportar a API Pointer Lock';
        }
    }
}