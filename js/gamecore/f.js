export function gameOver() {
    this.add.text(300, 250, '¡Juego Terminado!', { fontSize: '32px', fill: '#fff' });
    this.scene.pause();
}

export function updateScore() {
    this.scene.text.setText('Puntuación: ' + score);
}

function tankHitObstacle(tank, obstacle) {
    lives -= 1;
    livesText.setText('Vidas: ' + lives);

    if (lives === 0) {
        gameOver();
    }
}

function tankHitEnemy(tank, enemy) {
    // Si el tanque colisiona con un enemigo, perder una vida
    lives -= 1;
    livesText.setText('Vidas: ' + lives);
    if (lives === 0) {
        gameOver();
    }
}

function fireBullet() {
    let bullet = bullets.create(tank.x, tank.y, 'bullet');
    bullet.setVelocityY(-200);
}

function bulletHitObstacle(bullet, obstacle) {
    bullet.destroy();
    obstacle.destroy();
    
    score += 10;
    updateScore();
}

function breakObstacle(obstacle) {
    if (obstacle && obstacle.breakable) {
        obstacle.destroy(); 
        
    }
}

function addObstacle(scene, x, y, spriteKey) {

    const obstacle = scene.add.image(x, y, spriteKey).setOrigin(0);
    

    scene.physics.add.existing(obstacle);
    

    obstacle.breakable = true;

    return obstacle;
}