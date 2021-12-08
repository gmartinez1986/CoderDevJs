// Variables
const dataBase = [
    {
        id: 1,
        name: 'Findes Largos y Feriados',
        precio: 27300
    },
    {
        id: 2,
        name: 'Noroeste Argentino',
        precio: 30000
    },
    {
        id: 3,
        name: 'Merlo y Carlos Paz',
        precio: 20000
    },
    {
        id: 4,
        name: 'San Juan y La Rioja',
        precio: 40000
    },
    {
        id: 5,
        name: 'Bariloche',
        precio: 50000
    },
    {
        id: 6,
        name: 'Puerto Madryn',
        precio: 60000
    },
    {
        id: 7,
        name: 'El Calafate + Ushuaia',
        precio: 60000
    },
    {
        id: 8,
        name: 'Costa Atlántica',
        precio: 80000
    },
    {
        id: 9,
        name: 'Noroeste en Avión',
        precio: 70000
    }

];

let cart = [];
let total = 0;
const DOMcart = document.querySelector('#cart');
const DOMtotal = document.querySelector('#total');

/**********************************************************
 * Evento para añadir una oferta al carrito de la compra *
 **********************************************************/
function addOfferToCart(event) {

    // Ingreso oferta al carrito.
    cart.push(event.target.getAttribute('offerId'))
    // Calculo el total.
    calculateTotal();
    // Actualizo el carrito. 
    renderCart();
}

/******************************************************
 * Dibuja todos las ofertas guardados en el carrito *
 ******************************************************/
function renderCart() {
    // Vació todo el html.
    DOMcart.textContent = '';
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

        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].name} - $ ${miItem[0].precio}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.margin = '0.5rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcart.appendChild(miNodo);
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
    renderCart();
    // Calculamos de nuevo el precio
    calculateTotal();
}

/**********************************************************************
 * Calcula el precio total teniendo en cuenta los productos repetidos *
 **********************************************************************/
function calculateTotal() {
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

/********************
 * Varia el carrito *
 ********************/
function emptyCart() {

    // Limpiamos los productos guardados
    cart = [];
    // Renderizamos los cambios
    renderCart();
    calculateTotal();
}