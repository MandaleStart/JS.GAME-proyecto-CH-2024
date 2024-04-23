const usuarioRegistrado = localStorage.getItem("userLogged");
document.addEventListener("DOMContentLoaded", function () {
    const userControlList = document.getElementById("user-control-list");
    const userControl = document.getElementById("user-control");
    if (usuarioRegistrado) {
        
        userControlList.appendChild(createNavItem("Jugar", "/views/game.html"));
        userControlList.appendChild(createNavItem("Tienda", "/views/shop.html"));

        const botonSalir = createButton("Salir", closeSession);
        const botonPerfil = createLink(usuarioRegistrado, "/views/perfil.html");
        
        userControl.appendChild(botonPerfil);
        userControl.appendChild(botonSalir);
        
    } else {
        let regLog = createNavItem("Registro/Login", "/views/reg-log.html")
        userControl.appendChild(regLog);
    }

    userControlList.appendChild(createSelectIdioma());
   /*mostrarPuntajes();*/
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
    localStorage.removeItem("userLoged");
    window.location.href = "/views/reg-log.html";
}

/*function mostrarPuntajes() {
    const tabla = document.getElementById("scoretable");
  
    firestore.collection("puntajes").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const fila = tabla.insertRow();
            fila.insertCell(0).textContent = doc.id;
            fila.insertCell(1).textContent = doc.data().puntaje;
            const tiempoEnMinutos = milisegundosAMinutos(doc.data().tiempo);
            fila.insertCell(2).textContent = `${tiempoEnMinutos} minutos`;
        });
    });
}*/

function milisegundosAMinutos(ms) {
    return Math.floor(ms / 60000); // 1 minuto = 60000 milisegundos
}
