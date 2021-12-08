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
    },
    {
        id: 7,
        nombre: 'El Calafate + Ushuaia',
        precio: 60000
    },
    {
        id: 8,
        nombre: 'Costa Atlántica',
        precio: 80000
    },
    {
        id: 9,
        nombre: 'Noroeste en Avión',
        precio: 70000
    }

];

let cart = [];
let total = 0;

/**
 * Evento para añadir un producto al carrito de la compra
 */
function addOfferToCart(event) {

    // Anyadimos el Nodo a nuestro carrito
    cart.push(event.target.getAttribute('offerId'))
    // Calculo el total
    calcularTotal();
    // Actualizamos el carrito 
    renderizarCarrito();
}

/******************************************************
 * Dibuja todos los productos guardados en el carrito *
 ******************************************************/
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

/**********************************************
 * Evento para borrar un elemento del carrito *
 **********************************************/
function borrarItemCarrito(event) {

    // Obtenemos el ID de la oferta.
    const id = event.target.dataset.item;
    // Borramos todos los productos
    cart = cart.filter((offerId) => {
        return offerId !== id;
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
function emptyCart() {

    // Limpiamos los productos guardados
    cart = [];
    // Renderizamos los cambios
    renderizarCarrito();
    calcularTotal();
}