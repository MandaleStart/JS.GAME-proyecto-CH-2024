let tank;
let bullets;
let obstacles;
let enemies; // Grupo para los enemigos
let score = 0;
let lives = 3;
let ammo = 10;
let speedPowerup;
let ammoPowerup;

function preload() {
    this.load.image('tank', '../models/tanques/player.png');
    this.load.image('bullet', 'ruta/a/la/imagen/proyectil.png');
    this.load.image('obstacle', '../models/terrain/obstacles/Container_A.png');
    this.load.image('speed', '../models/dropitem/speed.png');
    this.load.image('ammo', '../models/dropitem/Ammo.png');
    this.load.image('enemy', '../models/tank/enemy.png');
    
}

function create() {
    tank = this.physics.add.sprite(100, 100, 'tank');
    tank.setScale(0.5);
    this.physics.world.enable(tank);

    bullets = this.physics.add.group();
    obstacles = this.physics.add.group();
    enemies = this.physics.add.group(); // Crear grupo para los enemigos


    tank.setDisplaySize(50, 50);
    
    cursors = this.input.keyboard.createCursorKeys();

    tank.setCollideWorldBounds(true);

    for (let i = 0; i < 5; i++) {
        let obstacle = obstacles.create(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'obstacle');
        
        obstacle.setDisplaySize(100, 150);
    }

    this.physics.add.collider(bullets, obstacles, bulletHitObstacle, null, this);
    this.physics.add.collider(tank, obstacles, tankHitObstacle, null, this);
    this.physics.add.collider(tank, enemies, tankHitEnemy, null, this); // Detectar colisión entre el tanque y los enemigos

    speedPowerup = this.physics.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'speed');
    speedPowerup.setDisplaySize(40, 40);
    this.physics.add.overlap(tank, speedPowerup, collectSpeedPowerup, null, this);

    ammoPowerup = this.physics.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'ammo');
    ammoPowerup.setDisplaySize(40, 40);
    this.physics.add.overlap(tank, ammoPowerup, collectAmmoPowerup, null, this);

    // Crear enemigos en posiciones aleatorias
    for (let i = 0; i < 3; i++) {
        let enemy = enemies.create(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'enemy');
        enemy.setVelocity(Phaser.Math.Between(-50, 50), Phaser.Math.Between(-50, 50)); // Establecer una velocidad aleatoria para los enemigos
        enemy.setCollideWorldBounds(true);
        enemy.setDisplaySize(50, 50);

    }
    
    let scoreText = this.add.text(16, 16, 'Puntuación: 0', { fontSize: '24px', fill: '#fff' });
    livesText = this.add.text(650, 16, 'Vidas: 3', { fontSize: '24px', fill: '#fff' });
    ammoText = this.add.text(350, 16, 'Municiones: 10', { fontSize: '24px', fill: '#fff' });
}

function update() {
    if (cursors.up.isDown) {
        tank.setVelocityY(-100);
    } else if (cursors.down.isDown) {
        tank.setVelocityY(100);
    } else {
        tank.setVelocityY(0);
    }

    if (cursors.left.isDown) {
        tank.setVelocityX(-100);
    } else if (cursors.right.isDown) {
        tank.setVelocityX(100);
    } else {
        tank.setVelocityX(0);
    }

    if (cursors.space.isDown && ammo > 0) {
        fireBullet();
        ammo--;
        ammoText.setText('Municiones: ' + ammo);
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

function collectSpeedPowerup(tank, powerup) {
    speedPowerup.destroy();
    tank.setVelocity(300);
    setTimeout(() => {
        tank.setVelocity(0);
    }, 5000);
}

function collectAmmoPowerup(tank, powerup) {
    ammo += 5;
    ammoText.setText('Municiones: ' + ammo);
    powerup.destroy();
}

function updateScore() {
    this.scene.text.setText('Puntuación: ' + score);
}

function gameOver() {
    this.add.text(300, 250, '¡Juego Terminado!', { fontSize: '32px', fill: '#fff' });
    this.scene.pause();
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
