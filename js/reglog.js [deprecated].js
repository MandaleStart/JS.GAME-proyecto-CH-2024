document.addEventListener('DOMContentLoaded', function() {
    const btnSendReg = document.getElementById('btn-send-reg');
    const btnSendLogin = document.getElementById('btn-send-login');

    btnSendReg.addEventListener('click', function() {
        const username = document.getElementById('username-reg').value;
        const mail = document.getElementById('mail-reg').value;
        const password = document.getElementById('password-reg').value;
        const confirmPassword = document.getElementById('confirm-password-reg').value;
        const birthday = document.getElementById('date-reg').value;
        const gameNotify = document.getElementById('notify-reg').checked;
        const gameTyc = document.getElementById('tyc-reg').checked;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const userData = {
            username: username,
            mail: mail,
            password: password,
            birthday: birthday,
            gameNotify: gameNotify,
            gameTyc: gameTyc
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        alert('¡Registro exitoso!');

        document.getElementById('username-reg').value = '';
        document.getElementById('mail-reg').value = '';
        document.getElementById('password-reg').value = '';
        document.getElementById('confirm-password-reg').value = '';
        document.getElementById('date-reg').value = '';
        document.getElementById('notify-reg').checked = false;
        document.getElementById('tyc-reg').checked = false;
    });

    btnSendLogin.addEventListener('click', function() {
        
        const userLogin = document.getElementById('user-login').value;
        const passwordLogin = document.getElementById('password-login').value;

        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            if (userLogin === userData.username && passwordLogin === userData.password) {

                localStorage.setItem('userLoged', userData.username);
                alert('¡Inicio de sesión exitoso!');
                window.location.href = "/views/game.html";
            } else {
                alert('Nombre de usuario o contraseña incorrectos');
            }
        } else {
            alert('No hay datos de registro almacenados');
        }

        
        document.getElementById('user-login').value = '';
        document.getElementById('password-login').value = '';
    });
});

