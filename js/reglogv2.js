import { auth, database } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { set, ref , get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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
        Swal.fire('Error', 'Por favor ingrese una dirección de correo electrónico válida', 'error');
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        return;
    }

    if (password.length < 6) {
        Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }

    if (!/\d/.test(password)) {
        Swal.fire('Error', 'La contraseña debe contener al menos un número', 'error');
        return;
    }

    if (gameTyc !== true) {
        Swal.fire('Error', 'Debe leer y aceptar los términos y condiciones', 'error');
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

            },
            gamesettings: {
                // configuracion de teclas basicas
                action: "space",
                down: "s",
                left: "a",
                music: "on",
                rigth: "d",
                sound: "on",
                up: "w"
            }
        });
        Swal.fire('Perfecto!', '¡Registro exitoso!','success');
    } catch (error) {
        if (error.code === 'auth/email-already-exists') {
            Swal.fire('Error', 'Otro usuario ya está utilizando el correo electrónico proporcionado.')
        } else {
            console.error(error.message);
            Swal.fire('Error', 'Error en el registro');
        }

    }
});
// limitar la fecha de nacimiento 
window.addEventListener('load', function () {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minYear = currentYear - 100;
    const maxYear = currentYear - 3;
    const setDateY = currentYear - 18;
    const setDateM = "01";
    const setDateD = "01";


    const dateInput = document.getElementById('date-reg');
    dateInput.setAttribute('min', `${minYear}-01-01`);
    dateInput.setAttribute('max', `${maxYear}-12-31`);
    dateInput.setAttribute('value', `${setDateY}-${setDateM}-${setDateD}`);
});

// Agrega un evento al botón de inicio de sesión
const btnSendLogin = document.getElementById('btn-send-login');
btnSendLogin.addEventListener('click', 
    signIn);


async function signIn() {
    const userLogin = document.getElementById('user-login').value;
    const passwordLogin = document.getElementById('password-login').value;
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(userLogin)) {
        Swal.fire('Error', 'Por favor ingrese una dirección de correo electrónico válida');
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

        Swal.fire({
            title: 'Inicio de sesión exitoso!',
            text: '¡Seras redireccionado al juego en unos segundos!',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: 'Ir al juego'
        }).then((result) => {
            // Redireccionar solo si el usuario hace clic en el botón "OK"
            if (result.isConfirmed) {
                window.location.href = "/views/game.html";
            }
        });
        
        // Agrega un retraso de 10 segundos antes de redireccionar automáticamente
        setTimeout(function() {
            window.location.href = "/views/game.html";
        }, 10000);
        
    }
    catch (error) {
        // Verifica el código de error y muestra un mensaje personalizado
        if (error.code === 'auth/network-request-failed') {
            Swal.fire('Error', 'Falló la conexión de red. Verifica tu conexión a internet y vuelve a intentarlo.')
        } else if (error.code === 'auth/too-many-requests') {
            Swal.fire('Error', ' Se han enviado demasiadas solicitudes de inicio de sesión recientemente. Espera un momento antes de intentarlo de nuevo..');
        } else if (error.code === 'auth/user-disabled') {
            Swal.fire('Error', 'Error al iniciar: La cuenta está deshabilitada.');
        } else {
            console.log(error)
            Swal.fire('Error', 'Error al iniciar: Revise sus datos de acceso');
        }
    }
}


//resetear password en firebase

const btnResetPass = document.getElementById('btn-reset-pass');

btnResetPass.addEventListener('click', async function () {
    const emailToReset = document.getElementById('user-login').value;

    try {
        // Envía un correo electrónico para restablecer la contraseña
        await sendPasswordResetEmail(auth, emailToReset);
        Swal.fire('Error', 'Se ha enviado un correo electrónico para restablecer la contraseña.');
    } catch (error) {
        console.error(error.message);
        Swal.fire('Error', 'Error al enviar el correo electrónico para restablecer la contraseña.');
    }
});
// ocultar/mostrar password
const togglePasswordReg = document.getElementById('toggle-password-reg');
const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
const toggleLoginPassword = document.getElementById('toggle-login-password');

const passwordInputReg = document.getElementById('password-reg');
const passwordInputLogin = document.getElementById('password-login');
const confirmPasswordInput = document.getElementById('confirm-password-reg');

togglePasswordReg.addEventListener('click', function () {
    const type = passwordInputReg.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInputReg.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye-slash');
});

toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye-slash');
});

toggleLoginPassword.addEventListener('click', function () {
    const type = passwordInputLogin.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInputLogin.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye-slash');
});




