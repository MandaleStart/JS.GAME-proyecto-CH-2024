class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }

    create() {
        // Obtén el centro horizontal y vertical de la pantalla
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Agregar texto para el título de la escena
        this.add.text(centerX, 50, 'Configuraciones', { fill: '#ffffff', fontSize: '32px' }).setOrigin(0.5);

        // Crear botón para cambiar la música
        const musicButton = this.add.text(centerX, centerY - 50, 'Cambiar Música', { fill: '#ffffff', fontSize: '24px' }).setOrigin(0.5);
        musicButton.setInteractive();

        // Definir acción al hacer clic en el botón de música
        musicButton.on('pointerdown', () => {

        
            let currentIndex = localStorage.getItem('musicIndex') || 0;
            currentIndex = (parseInt(currentIndex) + 1) % musicList.length;
            localStorage.setItem('musicIndex', currentIndex);
            // Detener la música actual antes de cargar y reproducir la nueva
            if (globalMusic) {
                globalMusic.stop();
            }
            loadGlobalMusic(currentIndex);
        });
s
    }
}

export default SettingsScene;
