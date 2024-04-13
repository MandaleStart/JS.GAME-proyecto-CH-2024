document.addEventListener("DOMContentLoaded", function () {
    // Detectar usuario logueado
    const usuarioRegistrado = localStorage.getItem("userLoged");
    // Control de navbar
    const userControlList = document.getElementById("user-control-list");
    // Módulo principal de user-control

    /*let imgperfil = document.createElement("img");
    imgperfil.src = `../models/USRFILE/${usuarioRegistrado}.png`
    imgperfil.alt = `user icon`
    imgperfil.className = "img-perfil"*/
    let listItem = document.createElement("li");
    listItem.className = "nav-item";
    let divItem = document.createElement("div");
    divItem.className = "nav-link";
    divItem.id = "user-control";

    listItem.appendChild(divItem);
    userControlList.appendChild(listItem);

    const userControl = document.getElementById("user-control");
    if (usuarioRegistrado) {
        console.log(`Usuario logeado: ${usuarioRegistrado }`)
        // habilita el enlace a tienda y jugar cuando esta registrado un usuario 
        userControlList.appendChild(createNavItem("Jugar", "/views/game.html"));
        userControlList.appendChild(createNavItem("Tienda", "/views/shop.html"));

        // boton salir / cerrar sesion 
        const botonSalir = document.createElement("button");
        botonSalir.textContent = "Salir";
        botonSalir.addEventListener("click", function () {
            closeSession();
        });
        //agrega enlace al perfil del jugador con el nombre de usuario 
        const botonPerfil = document.createElement("a");
        botonPerfil.textContent = usuarioRegistrado;
        botonPerfil.href = "/views/perfil.html";

        userControl.appendChild(botonPerfil);
        userControl.appendChild(botonSalir);
    } else {
        //si no esta registrado un usuario , muestra el enlace a la pagina de registro
        userControl.appendChild(createNavItem("Registro/Login", "/views/reg-log.html"));
    }

    userControlList.appendChild(createSelectIdioma());
    // cargarPuntuaciones();

    function createNavItem(texto, href) {
        const navItem = document.createElement("li");
        navItem.className = "nav-item";
        const navLink = document.createElement("a");
        navLink.textContent = texto;
        navLink.href = href;
        navLink.className = "nav-link";
        navItem.appendChild(navLink);
        return navItem;
    }

    function createSelectIdioma() {
        const selectIdioma = document.createElement("select");
        selectIdioma.id = "idioma";
        const opcionesIdioma = ["ES", "ING", "FR", "AL"];

        opcionesIdioma.forEach(function (opcion, index) {
            const opcionElemento = document.createElement("option");
            opcionElemento.textContent = opcion;
            selectIdioma.appendChild(opcionElemento);
        });

        const navItem = document.createElement("li");
        navItem.className = "nav-item";
        navItem.appendChild(selectIdioma);
        return navItem;
    }

    function closeSession() {
        localStorage.removeItem("userLoged");
        window.location.href = "/views/reg-log.html";
    }
/*  // falta CSS personalizado  para esta seccion
    function generarBarraSecundaria(jsonData) {
        const barraSecundaria = document.createElement('div');
        barraSecundaria.classList.add('secondary-navbar');

        jsonData.usuarios.forEach(usuario => {
            const usuarioElement = document.createElement('div');
            usuarioElement.classList.add('usuario');
            const textNode = document.createTextNode(`${usuario.usuario} | ${usuario.puntaje} | ${usuario.tiempo}`);
            usuarioElement.appendChild(textNode);
            barraSecundaria.appendChild(usuarioElement);
        });

        secondaryNavbar.appendChild(barraSecundaria);
    }

    function cargarPuntuaciones() {
        fetch(URL_DATOS_SCORE)
            .then(response => response.json())
            .then(data => generarBarraSecundaria(data))
            .catch(error => console.error('Error al cargar los datos:', error));
    }*/
});
