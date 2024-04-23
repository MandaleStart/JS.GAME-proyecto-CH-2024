
import { auth, database } from "./firebaseConfig.js";
// Obtener elementos del DOM
const profileZone = document.getElementById('main-profile');
const userControlList = document.getElementById('user-control-list');

// Mostrar interfaz de carga mientras se espera la autenticación y la carga de datos
profileZone.innerHTML = '<h1>Cargando...</h1>';

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Si el usuario está autenticado, obtiene su información desde Firebase Realtime Database
    const userId = user.uid;
    const userRef = ref(database, `users/${userId}`);
    
    // Observar cambios en los datos del usuario
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        // Si se encontraron datos del usuario, se muestran en el panel
        renderUserData(userData);
      } else {
        // Si no se encontraron datos del usuario, muestra un mensaje de error
        profileZone.innerHTML = '<h1>No se encontraron datos del usuario</h1>';
      }
    });
  } else {
    // Si el usuario no está autenticado, muestra el mensaje de "no está logeado"
    profileZone.innerHTML = '<h1>No estás logeado</h1>';
  }
});

function renderUserData(userData) {
  const userPanel = document.createElement('div');
  userPanel.classList.add('panel-usuario');

  userPanel.innerHTML = `
    <h2>Panel de Usuario</h2>
    <div class="campo">
      <label for="nombre-usuario">USERNAME</label>
      <input type="text" id="nombre-usuario" disabled value="${userData.user}">
    </div>
    <div class="campo">
      <label for="nombre">NOMBRE Y APELLIDO</label>
      <input type="text" id="nombre" disabled value="${userData.name}">
    </div>
    <div class="campo">
      <label for="mail">correo electronico</label>
      <input type="mail" id="mail" disabled value="${userData.mail}">
    </div>
    <div class="campo">
      <label for="fecha-nacimiento">FECHA DE NACIMIENTO</label>
      <input type="date" id="fecha-nacimiento" disabled value="${userData.birthday}">
    </div>
    <div class="campo">
      <label for="fecha-alta">FECHA DE ALTA DE USUARIO</label>
      <input type="text" id="fecha-alta" disabled value="${userData.createdAt}">
    </div>
    <div class="campo">
      <label for="notificaciones">NOTIFICACIONES</label>
      <input type="checkbox" id="notificaciones" disabled ${userData.gameTyc ? 'checked' : ''}>
    </div>
  `;

  profileZone.innerHTML = ''; // Limpiar el contenido existente
  profileZone.appendChild(userPanel);
}