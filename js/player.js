function moverTanque(direction) {
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
    player.style.transform = 'translate(-50%, -50%)' + 'rotate('+ foc +')'; 
}