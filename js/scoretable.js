const scoreTable = document.getElementById('scoretable');
const PUNTAJE = '/js/JSON/scores.json'; // Ruta del archivo JSON

async function leerArchivoJSON() {
  try {
    const response = await fetch(PUNTAJE);
    const puntajes = await response.json();
    return puntajes;
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    return null;
  }
}

async function construirTablaPuntajes() {
  const puntajes = await leerArchivoJSON();

  if (puntajes) {
    // Ordenar usuarios por puntaje (mayor a menor) y luego por tiempo (menor a mayor)
    puntajes.usuarios.sort((a, b) => {
      if (a.puntaje !== b.puntaje) {
        return b.puntaje - a.puntaje; // Ordenar por puntaje (mayor a menor)
      } else {
        const tiempoA = convertirTiempoAMinutos(a.tiempo);
        const tiempoB = convertirTiempoAMinutos(b.tiempo);
        return tiempoA - tiempoB; // Si hay empate en puntaje, ordenar por tiempo (menor a mayor)
      }
    });

    const tabla = document.createElement('table');
    const cabecera = document.createElement('thead');
    const filaCabecera = document.createElement('tr');
    const encabezados = ['Usuario', 'Puntaje', 'Tiempo'];

    encabezados.forEach(encabezado => {
      const th = document.createElement('th');
      th.textContent = encabezado;
      filaCabecera.appendChild(th);
    });

    cabecera.appendChild(filaCabecera);
    tabla.appendChild(cabecera);

    const cuerpoTabla = document.createElement('tbody');
    const usuariosMostrados = Math.min(10, puntajes.usuarios.length);
    for (let i = 0; i < usuariosMostrados; i++) {
      const usuario = puntajes.usuarios[i];
      const filaUsuario = document.createElement('tr');
      const { usuario: nombreUsuario, puntaje, tiempo } = usuario;
      [nombreUsuario, puntaje, tiempo].forEach(valor => {
        const td = document.createElement('td');
        td.textContent = valor;
        filaUsuario.appendChild(td);
      });
      cuerpoTabla.appendChild(filaUsuario);
    }

    tabla.appendChild(cuerpoTabla);
    scoreTable.appendChild(tabla);
  }
}

function convertirTiempoAMinutos(tiempo) {
  const partesTiempo = tiempo.split(':');
  const horas = parseInt(partesTiempo[0]);
  const minutos = parseInt(partesTiempo[1]);
  const segundos = parseInt(partesTiempo[2]);
  return horas * 60 + minutos + segundos / 60;
}

window.onload = function() {
  construirTablaPuntajes();
};
