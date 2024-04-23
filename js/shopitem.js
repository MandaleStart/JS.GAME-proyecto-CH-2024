//import { auth, database } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", function() {
    // Constante para la dirección del archivo JSON
    const URL_DATOS_TIENDA = "../js/JSON/shopitem.json";
    
    // Contenedores de mejoras y consumibles
    const listaMejoras = document.getElementById("lista-mejoras");
    const listaConsumibles = document.getElementById("lista-consumibles");
    
    // Función para cargar las mejoras y consumibles desde el archivo JSON
    function cargarDatosTienda() {
        
        fetch(URL_DATOS_TIENDA)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar el archivo de datos.");
                }
                return response.json();
            })
            .then(data => {
                
    
                // Mostrar las mejoras
                
                for (const categoria in data.upgrades) {
                    data.upgrades[categoria].forEach(upgrade => {
                        const item = crearItem(upgrade);
                        listaMejoras.appendChild(item);
                    });
                }
    
                // Mostrar los consumibles
                
                data.consumables.forEach(consumable => {
                    const item = crearItem(consumable);
                    listaConsumibles.appendChild(item);
                });
            })
            .catch(error => {
                console.error("Error al cargar los datos de la tienda:", error);
            });
    }

    function crearItem(item) {
        const divItem = document.createElement("div");
        divItem.classList.add("item");
    
        const imagen = document.createElement("img");
        imagen.src = item.img; 
        imagen.alt = item.nombre; 
    
        const divContenido = document.createElement("div"); // Nuevo div para el contenido
        divContenido.classList.add("contenido");
    
        const nombre = document.createElement("h3");
        nombre.textContent = item.nombre;
    
        const descripcion = document.createElement("p");
        descripcion.textContent = item.descripcion;
    
        const precio = document.createElement("p");
        precio.textContent = "Precio: $" + item.precio;
    
        const botonComprar = document.createElement("button");
        botonComprar.textContent = "Comprar";
        botonComprar.addEventListener("click", function() {
            comprarItem(item);
        });
    
        divContenido.appendChild(nombre);
        divContenido.appendChild(descripcion);
        divContenido.appendChild(precio);
        divContenido.appendChild(botonComprar);
    
        divItem.appendChild(imagen);
        divItem.appendChild(divContenido);
    
        return divItem;
    }

    // Cargar los datos de la tienda
    cargarDatosTienda();
});



// Función para actualizar la visualización del carrito
function actualizarVisualizacionCarrito() {
    // Obtener el contenedor del carrito
    const carritoContainer = document.getElementById('carrito');

    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Limpiar el contenido actual del contenedor del carrito
    carritoContainer.innerHTML = '';

    let total = 0; // Inicializar el total de la compra

    // Crear y agregar elementos para cada elemento en el carrito
    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('carrito-item'); // Agregar clase para aplicar estilos
        itemElement.innerHTML = `
            <span class="carrito-nombre">${item.nombre}</span>
            <span class="carrito-precio">$${item.precio}</span>
            <span class="carrito-contador">(${item.contador})</span>
        `;
        carritoContainer.appendChild(itemElement);

        // Sumar el precio del elemento al total
        total += item.precio;
    });

    // Mostrar el total de la compra
    const totalElement = document.createElement('div');
    totalElement.textContent = `Total: $${total.toFixed(2)}`; // Formatear el total a dos decimales
    carritoContainer.appendChild(totalElement);

    // Agregar el botón para finalizar la compra
    const finalizarCompraBtn = document.createElement('button');
    finalizarCompraBtn.textContent = 'Finalizar compra';
    finalizarCompraBtn.addEventListener('click', finalizarCompra);
    carritoContainer.appendChild(finalizarCompraBtn);
}

// Función para finalizar la compra
function finalizarCompra() {
    
    Swal.fire('¡Compra finalizada!', 'Gracias por tu compra', 'success');

    localStorage.removeItem('carrito');

    actualizarVisualizacionCarrito();
}
function comprarItem(item) {
    // Verificar si ya hay un carrito en el localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Buscar si el artículo ya está en el carrito
    const index = carrito.findIndex(i => i.nombre === item.nombre);

    if (index !== -1) {
        // Si el artículo ya está en el carrito, incrementar el contador y actualizar el precio
        carrito[index].contador++;
        carrito[index].precio = carrito[index].precio * carrito[index].contador;
    } else {
        // Si el artículo no está en el carrito, agregarlo con contador inicial 1
        const itemComprado = {
            nombre: item.nombre,
            precio: item.precio,
            contador: 1
        };
        carrito.push(itemComprado);
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar un mensaje de éxito
    Swal.fire('¡Perfecto!', '¡Agregaste ' + item.nombre + ' al carrito!', 'success');

    // Actualizar la visualización del carrito
    actualizarVisualizacionCarrito();
}
actualizarVisualizacionCarrito();