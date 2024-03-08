import './js/player'

let player_heals = 5;
let player_score = 0;
let game_time = 0;
let game_status = "active"; // active/paused

console.log("Puntaje:" + player_score)
console.log("Numero de vidas :"+ player_heals)
console.log("Tiempo:" + game_time)
console.log("Estado del juego:" + game_status)

languaje = ESP;

//control del tanque
const player = document.getElementById('player');
// Posición inicial del tanque
let posX = 0;
let posY = 0;
let foc = "0deg";

// pasos al mover
const step = 10;

//mover el tanque
function moverTanque(direction) {
    switch (direction) {
        case 'arriba':
            if (posY - step >= 0) posY -= step;
            foc = "0deg"
            break;
        case 'abajo':
            if (posY + step <= window.innerHeight - player.clientHeight) posY += step;
            foc = "180deg"
            break;
        case 'izquierda':
            if (posX - step >= 0) posX -= step;
            foc = "-90deg"
            break;
        case 'derecha':
            if (posX + step <= window.innerWidth - player.clientWidth) posX += step;
            foc = "90deg"
            break;
    }
    player.style.top = posY + 'px';
    player.style.left = posX + 'px';
    player.style.transform = 'translate(-50%, -50%)' + 'rotate('+ foc +')'; 
}

// event listeners para las flechas del teclado y disparo
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moverTanque('arriba');
            
            break;
        case 'ArrowDown':
            moverTanque('abajo');
            
            break;
        case 'ArrowLeft':
            moverTanque('izquierda');
            
            break;
        case 'ArrowRight':
            moverTanque('derecha');
            break;
        case ' ':
           // disparar ('player')
            console.log('¡Bang!');
            break;
    }
});



//========== [ IA TANKENEMY ] ==========
