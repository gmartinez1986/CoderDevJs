// Variables
const dataBase = [
    {
        id: 1,
        nombre: 'Findes Largos y Feriados',
        precio: 27300
    },
    {
        id: 2,
        nombre: 'Noroeste Argentino',
        precio: 30000
    },
    {
        id: 3,
        nombre: 'Merlo y Carlos Paz',
        precio: 20000
    },
    {
        id: 4,
        nombre: 'San Juan y La Rioja',
        precio: 40000
    },
    {
        id: 5,
        nombre: 'Bariloche',
        precio: 50000
    },
    {
        id: 6,
        nombre: 'Puerto Madryn',
        precio: 60000
    }

];

let cart = [];
let total = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
/*function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = info.precio + '€';
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}*/

/**
 * Evento para añadir un producto al carrito de la compra
 */
function addOfferToCart(event) {

    debugger

    // Anyadimos el Nodo a nuestro carrito
    cart.push(event.target.getAttribute('offerId'))
    // Calculo el total
    calcularTotal();
    // Actualizamos el carrito 
    renderizarCarrito();

}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(cart)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = dataBase.filter((itemDB) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemDB.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = cart.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');

        miNodo.style = "background:#04305f; color:white; font-size:1.1rem";

        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $ ${miItem[0].precio}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.margin = '0.5rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    cart.forEach((item) => {
        // De cada elemento obtenemos su precio
        const myItem = dataBase.filter((itemBD) => {
            return itemBD.id === parseInt(item);
        });
        total = total + myItem[0].precio;
    });
    // Renderizamos el precio en el HTML
    DOMtotal.textContent = total.toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    calcularTotal();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
/*renderizarProductos();*/