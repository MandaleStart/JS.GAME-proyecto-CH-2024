import { MainMenuScene , PlayScene , ConfigScene } from '/game/js/menu.js';

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: 'game-container',
    scene: [ MainMenuScene , PlayScene , ConfigScene ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};
const game = new Phaser.Game(config);