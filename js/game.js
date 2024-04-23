import MainMenuScene from '/game/js/menu.js';
import { TutorialScene } from '/game/js/gamescene.js';
import SettingsScene from '/game/js/settings.js';

// Define el directorio de los temas de música
export const musicDirectory = './models/music/';

// Lista de nombres de archivo de música
export const musicList = ['air_fight.mp3', 'arcade_mode.mp3', 'cyberpunk_gaming.mp3'];

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: 'game-container',
    scene: [MainMenuScene, SettingsScene, TutorialScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

// Variable global para la música
export let globalMusic;

// Función para cargar la música
export function loadGlobalMusic(index) {
    const musicPath = musicDirectory + musicList[index];
    globalMusic = game.sound.add('globalMusic', { loop: true });
    globalMusic.play({ volume: 0.5 });
}

// Cargar música por defecto al iniciar el juego
loadGlobalMusic(0);
