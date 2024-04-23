import { preloadSprites, generateRandomMap } from './mapeditor.js';
let keyConfig = {
    "upKey": "W",
    "downKey": "S",
    "leftKey": "A",
    "rightKey": "D"
}

class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialScene' });
    }
    preload() {
        preloadSprites(this); 
    }
    create() {
        const tileSize = 32;
        const rows = 20;
        const cols = 30;

        generateRandomMap(this, tileSize, rows, cols);

        const cursors = this.input.keyboard.addKeys({
            up: keyConfig.upKey,
            down: keyConfig.downKey,
            left: keyConfig.leftKey,
            right: keyConfig.rightKey
        });

    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    preload() {
        preloadSprites(this); 
    }
    create() {
        const tileSize = 32;
        const rows = 20;
        const cols = 30;
        const player = spawnCharacter(this, 100, 100, 'player', 'player');
        generateRandomMap(this, tileSize, rows, cols);

        generateObstacles(this, tileSize, rows, cols);
        const cursors = this.input.keyboard.addKeys({
            up: keyConfig.upKey,
            down: keyConfig.downKey,
            left: keyConfig.leftKey,
            right: keyConfig.rightKey
        });

        
    }
}

export { TutorialScene, GameScene };

