const SPRITES = {
    GRASS: 'grass',
    MUD: 'mud',
    PLAYER: 'player',
    ENEMY:'enemy'
};

function preloadSprites(scene) {
    scene.load.image(SPRITES.GRASS, '../models/terrain/grass.png');
    scene.load.image(SPRITES.MUD, '../models/terrain/mud.png');
    scene.load.image(SPRITES.ENEMY, '../models/characters/player.png');
    scene.load.image(SPRITES.PLAYER, '../models/characters/enemy.png');

}
function generateRandomMap(scene, tileSize, rows, cols) {
    const spriteSize = 32; // Tamaño del sprite

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const probability = Phaser.Math.Between(0, 100); // Genera un número entre 0 y 100

            // Ajusta los rangos de probabilidad para pasto y barro según tus necesidades
            if (probability < 80) { // 80% de probabilidad de pasto
                scene.add.image(col * tileSize, row * tileSize, SPRITES.GRASS).setOrigin(0).setDisplaySize(spriteSize, spriteSize);
            } else { // 20% de probabilidad de barro
                scene.add.image(col * tileSize, row * tileSize, SPRITES.MUD).setOrigin(0).setDisplaySize(spriteSize, spriteSize);
            }
        }
    }
}

function spawnCharacter(scene, x, y, spriteKey, characterType) {
    let character;

    if (characterType === 'player') {
        // Alinea la posición del jugador con la cuadrícula de tamaño 32x32
        const adjustedX = Math.floor(x / 32) * 32;
        const adjustedY = Math.floor(y / 32) * 32;
        character = scene.add.image(adjustedX, adjustedY, SPRITES.PLAYER).setOrigin(0);
    } else if (characterType === 'enemy') {
        // Alinea la posición del enemigo con la cuadrícula de tamaño 32x32
        const adjustedX = Math.floor(x / 32) * 32;
        const adjustedY = Math.floor(y / 32) * 32;
        character = scene.add.image(adjustedX, adjustedY, SPRITES.ENEMY).setOrigin(0);
    }

    scene.physics.add.existing(character);
    return character;
}
export { preloadSprites, spawnCharacter, generateRandomMap };
