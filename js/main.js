import { auth, database } from "./firebaseConfig.js";
import { get, ref } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const usuarioRegistrado = localStorage.getItem("userLogged");

document.addEventListener("DOMContentLoaded", async function () {
    const userControlList = document.getElementById("user-control-list");
    const userControl = document.getElementById("user-control");

    if (usuarioRegistrado) {
        userControlList.appendChild(createNavItem("Jugar", "/views/game.html"));
        userControlList.appendChild(createNavItem("Tienda", "/views/shop.html"));
        userControlList.appendChild(createNavItem("Comunidad", "/views/community.html"));

        const botonSalir = createButton("Salir", closeSession);
        const botonPerfil = createLink(usuarioRegistrado, "/views/perfil.html");

        userControl.appendChild(botonPerfil);
        userControl.appendChild(botonSalir);

        // Obtener el usuario actual de Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                // Obtener el UID del usuario actual
                const uid = user.uid;
                // Obtener la información del usuario desde la base de datos en tiempo real de Firebase
                const userSnapshot = await get(ref(database, 'users/' + uid + '/user'));
                const userData = userSnapshot.val();
                if (userData) {
                    localStorage.setItem("userLogged", userData);
                    // Actualizar el nombre de usuario en la barra de navegación
                    botonPerfil.textContent = userData;
                }
            } catch (error) {
                console.error("Error al obtener información de usuario:", error);
            }
        }
    } else {
        let regLog = createNavItem("Registro/Login", "/views/reg-log.html")
        userControl.appendChild(regLog);
    }

    userControlList.appendChild(createSelectIdioma());
});

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

    opcionesIdioma.forEach(opcion => {
        const opcionElemento = document.createElement("option");
        opcionElemento.textContent = opcion;
        selectIdioma.appendChild(opcionElemento);
    });

    const navItem = document.createElement("li");
    navItem.className = "nav-item";
    navItem.appendChild(selectIdioma);
    return navItem;
}

function createButton(texto, callback) {
    const boton = document.createElement("button");
    boton.textContent = texto;
    boton.addEventListener("click", callback);
    return boton;
}

function createLink(texto, href) {
    const link = document.createElement("a");
    link.textContent = texto;
    link.href = href;
    return link;
}

function closeSession() {
    auth.signOut().then(function() {
        localStorage.removeItem("userLogged");
        window.location.href = "/views/reg-log.html";
    }).catch(function(error) {
        // Manejo de errores si es necesario
        console.error("Error al cerrar sesión:", error);
    });
}

function milisegundosAMinutos(ms) {
    return Math.floor(ms / 60000); // 1 minuto = 60000 milisegundos
}
