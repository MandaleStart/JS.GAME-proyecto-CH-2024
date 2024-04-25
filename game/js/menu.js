import translations from './translate.json';
export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        // Cargar la configuración de idioma desde el localStorage o establecer un idioma predeterminado
        let language = localStorage.getItem('language') || 'ESP';
        let storedTranslations = JSON.parse(localStorage.getItem('translations'));

        // Verificar si hay traducciones guardadas en el localStorage, de lo contrario, cargarlas desde el archivo translate.json
        let translationsToUse = storedTranslations ? storedTranslations : translations;

        // Guardar las traducciones en el localStorage
        localStorage.setItem('translations', JSON.stringify(translationsToUse));

        // Agregar las opciones de menú principal
        this.agregarOpcionMenu(100, 100, translationsToUse['play'][language], 'PlayScene');
        this.agregarOpcionMenu(100, 200, translationsToUse['settings'][language], 'ConfigScene');
    }

    agregarOpcionMenu(x, y, texto, escena) {
        return this.add.text(x, y, texto, { fontSize: '32px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                // Iniciar la escena correspondiente al hacer clic en la opción del menú
                this.scene.start(escena);
            });
    }
}

// Submenú para la opción "JUGAR"
export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    create() {
        // Cargar la configuración de idioma desde el localStorage o establecer un idioma predeterminado
        let language = localStorage.getItem('language') || 'ESP';
        let translations = JSON.parse(localStorage.getItem('translations'));

        // Agregar las opciones de submenú para "JUGAR"
        this.agregarOpcionSubMenu(100, 100, translations['tutorial'][language], 'TutorialScene');
        this.agregarOpcionSubMenu(100, 200, translations['survival'][language], 'SurvivalScene');
    }

    agregarOpcionSubMenu(x, y, texto, escena) {
        return this.add.text(x, y, texto, { fontSize: '24px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                // Iniciar la escena correspondiente al hacer clic en la opción del submenú
                this.scene.start(escena);
            });
    }
}

// Submenú para la opción "CONFIGURAR"
export class ConfigScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ConfigScene' });
    }

    create() {
        // Cargar la configuración de idioma desde el localStorage o establecer un idioma predeterminado
        let language = localStorage.getItem('language') || 'ESP';
        let translations = JSON.parse(localStorage.getItem('translations'));

        // Agregar las opciones de submenú para "CONFIGURAR"
        this.agregarOpcionSubMenu(100, 100, translations['sound'][language], 'SoundScene');
        this.agregarOpcionSubMenu(100, 200, translations['language'][language], 'LanguageScene');
        this.agregarOpcionSubMenu(100, 300, translations['keys_binding'][language], 'KeysScene');
    }

    agregarOpcionSubMenu(x, y, texto, escena) {
        return this.add.text(x, y, texto, { fontSize: '24px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                // Iniciar la escena correspondiente al hacer clic en la opción del submenú
                this.scene.start(escena);
            });
    }
}