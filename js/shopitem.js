document.addEventListener("DOMContentLoaded", function() {
    // Constante para la dirección del archivo JSON
    const URL_DATOS_TIENDA = "../js/shopitem.json";

    console.log("URL del archivo de datos:", URL_DATOS_TIENDA);
    
    // Contenedores de mejoras y consumibles
    const listaMejoras = document.getElementById("lista-mejoras");
    const listaConsumibles = document.getElementById("lista-consumibles");
    
    // Función para cargar las mejoras y consumibles desde el archivo JSON
    function cargarDatosTienda() {
        console.log("Iniciando carga de datos de la tienda...");
        fetch(URL_DATOS_TIENDA)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar el archivo de datos.");
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos de la tienda cargados exitosamente:", data);
    
                // Mostrar las mejoras
                console.log("Mostrando mejoras...");
                for (const categoria in data.mejoras) {
                    data.mejoras[categoria].forEach(mejora => {
                        const item = crearItem(mejora);
                        listaMejoras.appendChild(item);
                    });
                }
    
                // Mostrar los consumibles
                console.log("Mostrando consumibles...");
                data.consumibles.forEach(consumible => {
                    const item = crearItem(consumible);
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

    // Función para simular la compra de un elemento
    function comprarItem(item) {
        
        console.log("Compraste:", item.nombre);
    }

    // Cargar los datos de la tienda
    cargarDatosTienda();
});
