// Importa los módulos necesarios de Firebase SDK
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDatabase, ref, set , get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";


// config de FB provisorio
const firebaseConfig = {
    apiKey: "AIzaSyCIohCcLbD_gnodGUqkd0cXeveqPQGDt40",
    authDomain: "nocombatname-1aa34.firebaseapp.com",
    projectId: "nocombatname-1aa34",
    storageBucket: "nocombatname-1aa34.appspot.com",
    messagingSenderId: "458148738106",
    appId: "1:458148738106:web:1f2887b354df1f79b4f103",
    databaseURL: "https://nocombatname-1aa34-default-rtdb.firebaseio.com/"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Agrega un evento al botón de registro
const btnSendReg = document.getElementById('btn-send-reg');
btnSendReg.addEventListener('click', async function () {
    const username = document.getElementById('username-reg').value;
    const mail = document.getElementById('mail-reg').value;
    const password = document.getElementById('password-reg').value;
    const confirmPassword = document.getElementById('confirm-password-reg').value;
    const birthday = document.getElementById('date-reg').value;
    const gameNotify = document.getElementById('notify-reg').checked;
    const gameTyc = document.getElementById('tyc-reg').checked;
    const emailRegex = /^\S+@\S+\.\S+$/;
    
    if (!emailRegex.test(mail)) {
        alert('Por favor ingrese una dirección de correo electrónico válida');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    if (gameTyc !== true) {
        alert('Debe leer y aceptar los terminos y condiciones');
        return;
    }
    try {
        // Registra al usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, mail, password);
        const user = userCredential.user;
        const currentDate = new Date().toLocaleString();
        // Guarda la información adicional en Firebase Realtime Database
        await set(ref(database, 'users/' + user.uid), {
            username: username,
            mail: mail,
            birthday: birthday,
            gameNotify: gameNotify,
            gameTyc: gameTyc,
            createdAt: currentDate,
            user: username,
            scoretable: {
                score: 0,
                time: 0
            },
            upgrades: {
                //mejoras iniciales, nombre de mejora y verificador de activacion por ejemplo:   "M-01": true; 
               
            },
            consumables: {
                // consumibles iniciales con su cantidad, ejemplo: "CON-04": 10,
                
            }
        });
        alert('¡Registro exitoso!');
    } catch (error) {
        console.error(error.message);
        alert('Error en el registro');
    }
});
// limitar la fecha de nacimiento 
window.addEventListener('load', function() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minYear = currentYear - 100;
    const maxYear = currentYear - 3;
    const setDateY = currentYear - 18;
    const setDateM =  "01";
    const setDateD =  "01";


    const dateInput = document.getElementById('date-reg');
    dateInput.setAttribute('min', `${minYear}-01-01`);
    dateInput.setAttribute('max', `${maxYear}-12-31`);
    dateInput.setAttribute('value', `${setDateY}-${setDateM}-${setDateD}`);
});

// Agrega un evento al botón de inicio de sesión
const btnSendLogin = document.getElementById('btn-send-login');
btnSendLogin.addEventListener('click', async function () {
    const userLogin = document.getElementById('user-login').value;
    const passwordLogin = document.getElementById('password-login').value;
console.log(userLogin , passwordLogin)
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(userLogin)) {
        alert('Por favor ingrese una dirección de correo electrónico válida');
        return;
    }

    try {
        // Inicia sesión con Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, userLogin, passwordLogin);
        const user = userCredential.user;

        // Obtiene el nombre de usuario desde la base de datos
        const userSnapshot = await get(ref(database, 'users/' + user.uid));
        const userData = userSnapshot.val();

        // Guarda el nombre de usuario en el localStorage
        localStorage.setItem("userLogged", userData.username);

        alert('¡Inicio de sesión exitoso!');
        window.location.href = "/views/game.html";
    } catch (error) {
        console.error(error.message);
        alert('Nombre de usuario o contraseña incorrectos');
    }
});


//resetear password en firebase

const btnResetPass = document.getElementById('btn-reset-pass');

btnResetPass.addEventListener('click', async function () {
    const emailToReset = document.getElementById('user-login').value;

    try {
        // Envía un correo electrónico para restablecer la contraseña
        await sendPasswordResetEmail(auth, emailToReset);
        alert('Se ha enviado un correo electrónico para restablecer la contraseña.');
    } catch (error) {
        console.error(error.message);
        alert('Error al enviar el correo electrónico para restablecer la contraseña.');
    }
});
// ocultar/mostrar password
const togglePasswordReg = document.getElementById('toggle-password-reg');
const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
const toggleLoginPassword = document.getElementById('toggle-login-password');

const passwordInputReg = document.getElementById('password-reg');
const passwordInputLogin = document.getElementById('password-login');
const confirmPasswordInput = document.getElementById('confirm-password-reg');

togglePasswordReg.addEventListener('click', function() {
    const type = passwordInputReg.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInputReg.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye-slash');
});

toggleConfirmPassword.addEventListener('click', function() {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye-slash');
});

toggleLoginPassword.addEventListener('click', function() {
    const type = passwordInputLogin.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInputLogin.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye-slash');
});