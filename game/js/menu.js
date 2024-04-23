import { musicDirectory, musicList, loadGlobalMusic } from '../../js/game.js'; // Ajusta la ruta de la importación según tu estructura de archivos

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        // Obtén el centro horizontal y vertical de la pantalla
        const centerX = this.cameras.main.width * 0.3; // 70% de la pantalla
        const centerY = this.cameras.main.height / 2;

        // Crear botón "TUTORIAL"
        const tutorialButton = this.add.text(centerX, centerY - 50, 'TUTORIAL', { fill: '#ffffff', fontSize: '32px' }).setOrigin(0.5);
        tutorialButton.setInteractive(); // Hacer el botón interactivo

        // Crear botón "JUGAR"
        const playButton = this.add.text(centerX, centerY, 'JUGAR', { fill: '#ffffff', fontSize: '32px' }).setOrigin(0.5);
        playButton.setInteractive(); // Hacer el botón interactivo

        // Crear botón "CONFIGURACIÓN"
        const settingsButton = this.add.text(centerX, centerY + 50, 'CONFIGURACIÓN', { fill: '#ffffff', fontSize: '32px' }).setOrigin(0.5);
        settingsButton.setInteractive(); // Hacer el botón interactivo

        // Definir acciones al hacer clic en los botones
        tutorialButton.on('pointerdown', () => {
            this.scene.start('TutorialScene');
        });

        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
            // Lógica para ir a la escena de juego
        });

        settingsButton.on('pointerdown', () => { // Cambiar a la escena de configuraciones
            this.scene.start('SettingsScene');
        });

        // Reproducir música en cadena
        this.playMusicInSequence();
    }

    // Método para reproducir música en cadena
    playMusicInSequence() {
        let currentIndex = 0;

        const playNextMusic = () => {
            const music = this.sound.add(musicDirectory + musicList[currentIndex]);
            music.play();

            music.once('complete', () => {
                music.destroy(); 
                currentIndex = (currentIndex + 1) % musicList.length; 
                playNextMusic();
            });
        };

        playNextMusic(); 
    }
}

export default MainMenuScene;
