// [Funcion para cargar juego]
function loadGame() {
    console.log('Inicia carga')
    //crear nuevo tanque para jugador dentro de juego 
    let canvas = document.getElementById('juego');
    canvas.innerHTML = `
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
// Posición inicial del tanque 1
let posXPlayer1 = 0;
let posYPlayer1 = 0;

// Posición inicial del tanque 2
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
            newY -= step;
            break;
        case 'abajo':
            newY += step;
            break;
        case 'izquierda':
            newX -= step;
            break;
        case 'derecha':
            newX += step;
            break;
    }

    // colision
    if (player === 'player1' && !verificarColision(newX, newY, posXPlayer2, posYPlayer2) ||
        player === 'player2' && !verificarColision(newX, newY, posXPlayer1, posYPlayer1)) {
        posX = newX;
        posY = newY;
    }

    // Actualizar posición del tanque
    document.getElementById(player).style.top = posY + 'px';
    document.getElementById(player).style.left = posX + 'px';
}
function disparar(player){
 console.log( ` ${player} ha disparado un proyectil`)
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