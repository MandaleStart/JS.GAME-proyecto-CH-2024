document.addEventListener("DOMContentLoaded", function() {
    const usuarioRegistrado = localStorage.getItem("userLoged");
    const user_control = document.getElementById("user-control");
    const botonSalir = document.createElement("button");
    const botonperfil = document.createElement("a");

    if (usuarioRegistrado) {
        botonperfil.textContent = usuarioRegistrado;
        // Cambiar el href al perfil del usuario
        botonperfil.href = "/views/perfil.html";
        // Mostrar el botón de salir
        botonSalir.textContent = "Salir";
        botonSalir.addEventListener("click", function() {
            closeSession();
        });
        user_control.appendChild(botonperfil);
        user_control.appendChild(botonSalir);
    } else {
        user_control.textContent = "Registro/Login";
        // Cambiar el href a la página de registro/login
        user_control.href = "/views/reg-log.html";
        // Ocultar el botón de salir
        botonSalir.style.display = "none";
    }

    const selectIdioma = document.getElementById("languaje");
    const opcionesIdioma = ["ES", "ING", "FR", "AL"];
    const iconos = ["fa-language", "fa-language", "fa-language", "fa-language"]; 

    opcionesIdioma.forEach(function(opcion, index) {
        const opcionElemento = document.createElement("option");
        opcionElemento.textContent = opcion;
        
        // Crear el elemento de icono y agregar clases de Font Awesome
        const icono = document.createElement("i");
        icono.classList.add("fas", iconos[index]);
        
        // Agregar el icono al principio del texto de la opción
        opcionElemento.insertBefore(icono, opcionElemento.firstChild);
        
        // Agregar la opción al select
        selectIdioma.appendChild(opcionElemento);
    });
});

function closeSession() {
    // Eliminar la información de sesión del localStorage
    localStorage.removeItem("userLoged");
    
    // Redirigir a la página de inicio de sesión
    window.location.href = "/views/reg-log.html";
}