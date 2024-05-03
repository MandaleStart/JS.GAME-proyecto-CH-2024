
// importar CDN
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
// Configuracion - falta cambiar a .ENV por seguridad
const firebaseConfig = {
  apiKey: "AIzaSyCIohCcLbD_gnodGUqkd0cXeveqPQGDt40",
  authDomain: "nocombatname-1aa34.firebaseapp.com",
  projectId: "nocombatname-1aa34",
  storageBucket: "nocombatname-1aa34.appspot.com",
  messagingSenderId: "458148738106",
  appId: "1:458148738106:web:1f2887b354df1f79b4f103",
  databaseURL: "https://nocombatname-1aa34-default-rtdb.firebaseio.com/"
};

const firebaseApp = initializeApp(firebaseConfig);
// inicia el modulo para autenticar usuarios
const auth = getAuth(firebaseApp);

// inicia el modulo para conectar a la base de datos REALTIME
const database = getDatabase(firebaseApp);

// inicia el modulo Storage
const storage = getStorage(firebaseApp); 

export { auth, database , storage };

