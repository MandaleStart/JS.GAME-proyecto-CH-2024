/* usernick de player 1 y 2 seran pedidos dentro del juego despues  como usuarios temporales
    Seccion de login permitira  crear usuarios permanentes para guardar los puntajes en una BD
 */

// [Funcion para cargar juego]
function loadGame() {
    console.log('Inicia carga')
    //crear nuevo tanque para jugador dentro de juego 
    let canvas = document.getElementById('juego');
    canvas.innerHTML += `
        <div id="player1">
            <div id="oruga-izquierda"></div>
            <div id="tanque"></div>
            <div id="base-cannon"></div>
            <div id="cannon"></div>
            <div id="oruga-derecha"></div>
        </div>
    `;
    canvas.innerHTML += `
        <div id="player2">
            <div id="oruga-izquierda"></div>
            <div id="tanque"></div>
            <div id="base-cannon"></div>
            <div id="cannon"></div>
            <div id="oruga-derecha"></div>
        </div>
    `;
};

loadGame();
// Posición inicial del tanque 1 y 2
let posXPlayer1 = 0;
let posYPlayer1 = 0;

let posXPlayer2 = 100;
let posYPlayer2 = 50;

// pasos al mover
const step = 10;

// Función para verificar colisión entre tanques 
function verificarColision(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) < 30 && Math.abs(y1 - y2) < 30;
}

// Función para mover tanque
function moverTanque(direction, player, posX, posY) {
    let newX = posX;
    let newY = posY;
        switch (direction) {
            case 'arriba':
                if (posY - step >= 0) {
                    posY -= step;
                    foc = "0deg";
                    console.log(`${player}Player se mueve hacia arriba`);
                } else {
                    console.log("No se puede mover hacia arriba");
                }
                break;
            case 'abajo':
                if (posY + step <= window.innerHeight - player.clientHeight) {
                    posY += step;
                    foc = "180deg";
                    console.log(`${player} se mueve hacia abajo`);
                } else {
                    console.log("No se puede mover hacia abajo");
                }
                break;
            case 'izquierda':
                if (posX - step >= 0) {
                    posX -= step;
                    foc = "-90deg";
                    console.log(`${player} se mueve hacia la izquierda`);
                } else {
                    console.log("No se puede mover hacia la izquierda");
                }
                break;
            case 'derecha':
                if (posX + step <= window.innerWidth - player.clientWidth) {
                    posX += step;
                    foc = "90deg";
                    console.log(`${player} se mueve hacia la derecha`);
                } else {
                    console.log("No se puede mover hacia la derecha");
                }
                break;
        }
    // colision
    if (player === 'player1' && !verificarColision(newX, newY, posXPlayer2, posYPlayer2) ||
        player === 'player2' && !verificarColision(newX, newY, posXPlayer1, posYPlayer1)) {
            
        posX = newX;
        posY = newY;
    }

    // Actualizar posición del tanque
    document.getElementById(player).style.transform = 'translate(-50%, -50%)' + 'rotate(' + foc + ')';
    document.getElementById(player).style.top = posY + 'px';
    document.getElementById(player).style.left = posX + 'px';
}
function disparar(player) {
    console.log(` ${player} ha disparado un proyectil`)
};

// event listeners para las flechas del teclado y disparo
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        //[ Player 1] 
        case 'ArrowUp':
            moverTanque('arriba', 'player1', posXPlayer1, posYPlayer1);
            break;
        case 'ArrowDown':
            moverTanque('abajo', 'player1', posXPlayer1, posYPlayer1);
            break;
        case 'ArrowLeft':
            moverTanque('izquierda', 'player1', posXPlayer1, posYPlayer1);
            break;
        case 'ArrowRight':
            moverTanque('derecha', 'player1', posXPlayer1, posYPlayer1);
            break;
        case '.':
            disparar('player1');
            break;
        //[ Player 2] 
        case 'W':
        case 'w':
            moverTanque('arriba', 'player2', posXPlayer2, posYPlayer2);
            break;
        case 'S':
        case 's':
            moverTanque('abajo', 'player2', posXPlayer2, posYPlayer2);
            break;
        case 'A':
        case 'a':
            moverTanque('izquierda', 'player2', posXPlayer2, posYPlayer2);
            break;
        case 'D':
        case 'd':
            moverTanque('derecha', 'player2', posXPlayer2, posYPlayer2);
            break;
        case ' ':
            disparar('player2');
            break;
    }
});

/*

function moverTanque(direction, player) {
    switch (direction) {
        case 'arriba':
            if (posY - step >= 0) {
                posY -= step;
                foc = "0deg";
                console.log('Player se mueve hacia arriba');
            } else {
                console.log("No se puede mover hacia arriba");
            }
            break;
        case 'abajo':
            if (posY + step <= window.innerHeight - player.clientHeight) {
                posY += step;
                foc = "180deg";
                console.log('Player se mueve hacia abajo');
            } else {
                console.log("No se puede mover hacia abajo");
            }
            break;
        case 'izquierda':
            if (posX - step >= 0) {
                posX -= step;
                foc = "-90deg";
                console.log('Player se mueve hacia la izquierda');
            } else {
                console.log("No se puede mover hacia la izquierda");
            }
            break;
        case 'derecha':
            if (posX + step <= window.innerWidth - player.clientWidth) {
                posX += step;
                foc = "90deg";
                console.log('Player se mueve hacia la derecha');
            } else {
                console.log("No se puede mover hacia la derecha");
            }
            break;
    }
    player.style.top = posY + 'px';
    player.style.left = posX + 'px';
    player.style.transform = 'translate(-50%, -50%)' + 'rotate(' + foc + ')';
}*/