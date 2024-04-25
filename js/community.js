import { storage , database } from "./firebaseConfig.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const userSearchInput = document.getElementById("userSearch");
const perfilUsuarioContainer = document.getElementById("SearchList");
//IMG por defecto para perfiles
//const defaultImg = storage.ref("unknowplayer.jpg");
const defaultUrlImg = "https://firebasestorage.googleapis.com/v0/b/nocombatname-1aa34.appspot.com/o/unknowplayer.jpg?alt=media&token=7968813e-f6ff-48c8-9403-0604acdfc030"
// Cargar todos los usuarios al principio
cargarTodosUsuarios();

// Agregar un event listener al input de búsqueda
userSearchInput.addEventListener("input", () => {
    const searchTerm = userSearchInput.value.toLowerCase();
    // Filtrar usuarios según el término de búsqueda
    buscarUsuariosEnDB(searchTerm);
});

function cargarTodosUsuarios() {
    // Obtener una referencia al grupo de usuarios en la base de datos
    const usuariosRef = ref(database, "users");
    
    // Escuchar cambios en los datos de los usuarios
    onValue(usuariosRef, (snapshot) => {
        const usuarios = snapshot.val();
        
        // Verificar si hay usuarios y mostrarlos todos
        if (usuarios) {
            const usuariosArray = Object.entries(usuarios);
            // Mostrar los perfiles de todos los usuarios
            mostrarPerfilesUsuarios(usuariosArray);
        } else {
            console.log("No se encontraron usuarios en la base de datos.");
        }
    });
}

function buscarUsuariosEnDB(terminoBusqueda) {
    // Obtener una referencia al grupo de usuarios en la base de datos
    const usuariosRef = ref(database, "users");
    
    // Escuchar cambios en los datos de los usuarios
    onValue(usuariosRef, (snapshot) => {
        const usuarios = snapshot.val();
        
        // Verificar si hay usuarios y realizar la búsqueda
        if (usuarios) {
            const usuariosCoincidentes = Object.entries(usuarios).filter(([uid, usuario]) => {
                // Buscar coincidencia en el nombre de usuario
                return usuario.username.toLowerCase().includes(terminoBusqueda);
            });
            
            // Mostrar los perfiles de usuarios coincidentes
            mostrarPerfilesUsuarios(usuariosCoincidentes);
        } else {
            console.log("No se encontraron usuarios en la base de datos.");
        }
    });
}
function mostrarPerfilesUsuarios(usuarios) {
    // Limpiar el contenedor antes de mostrar nuevos perfiles
    perfilUsuarioContainer.innerHTML = "";

    // Función para formatear la fecha
    function formatearFecha(fecha) {
        const fechaFormateada = new Date(fecha);
        return `${fechaFormateada.getDate()}/${fechaFormateada.getMonth() + 1}/${fechaFormateada.getFullYear()}`;
    }

    // Crear los elementos de perfil de usuario y agregarlos al contenedor
    usuarios.map(([uid, usuario]) => {
        // Crear un elemento de perfil de usuario
        const perfilUsuario = document.createElement("div");
        perfilUsuario.classList.add("perfil-usuario");
        
        // Crear elementos para mostrar la información del usuario
        const nombreUsuario = document.createElement("h2");
        nombreUsuario.textContent = usuario.username;
        
        const correoUsuario = document.createElement("p");
        correoUsuario.textContent = usuario.mail;
        
        const fechaNacimientoUsuario = document.createElement("p");
        fechaNacimientoUsuario.textContent = usuario.birthday;
        
        const createdAt = document.createElement("p");
        createdAt.textContent = `Se unió al juego el ${usuario.createdAt}`;
        createdAt.classList.add("fecha-creacion");
        
        // Crear elemento de imagen del usuario
        const imagenUsuario = document.createElement("img");
        // Verificar si usuario.imgprofile está definido
        if (usuario.imgprofile) {
            imagenUsuario.src = usuario.imgprofile; // Usar la URL de usuario.imgprofile si está definida
        } else {
            // Si usuario.imgprofile no está definido, usar la URL por defecto
                imagenUsuario.src = defaultUrlImg;
            
        }
        imagenUsuario.classList.add("img-profile");
        imagenUsuario.alt = "Imagen de perfil de usuario";
        
        // Agregar elementos al perfil del usuario
        perfilUsuario.appendChild(imagenUsuario);
        perfilUsuario.appendChild(nombreUsuario);
        perfilUsuario.appendChild(correoUsuario);
        perfilUsuario.appendChild(fechaNacimientoUsuario);
        perfilUsuario.appendChild(createdAt);
        
        // Agregar perfil del usuario al contenedor principal
        perfilUsuarioContainer.appendChild(perfilUsuario);
    });
}

