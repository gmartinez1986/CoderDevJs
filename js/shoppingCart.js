$(document).ready(function () {

    fetch('../js/dataBase.json')
        .then(response => response.json())
        .then(function (data) {

            const DOMcart = document.querySelector('#cart');

            const dataBase = data.packages;

            /******************************************************
             * Dibuja todas las ofertas guardadas en el carrito   *
             ******************************************************/
            function renderCart() {
                // Vació todo el html.
                DOMcart.textContent = '';
                // Quitar los duplicados.
                const cartWithoutDuplicates = [...new Set(cart)];
                // Genero los Nodos a partir de carrito.
                cartWithoutDuplicates.forEach((item) => {
                    
                    // Obtengo el ítem que necesito de la variable base de datos.
                    const myItem = dataBase.filter((itemDB) => {
                        // ¿Coincide los id? Solo puede existir un caso.
                        return itemDB.id === parseInt(item);
                    });
                    // Cuenta el número de veces que se repite la oferta.
                    const numberUnitsItem = cart.reduce((total, itemId) => {
                        // ¿Coincide los id? Incremento el contador, en caso contrario no mantengo.
                        return itemId === item ? total += 1 : total;
                    }, 0);

                    // Creo el nodo del ítem del carrito.
                    const myNodo = document.createElement('li');
                    myNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                    myNodo.style = "background:#04305f; color:white; font-size:1.1rem";
                    myNodo.textContent = `${numberUnitsItem} x ${myItem[0].name} - $ ${myItem[0].price.toLocaleString('es-es')}`;

                    // Boton de borrar.
                    const myBoton = document.createElement('button');
                    myBoton.classList.add('btn', 'btn-danger', 'mx-5');
                    myBoton.textContent = 'X';
                    myBoton.style.margin = '0.5rem';
                    myBoton.dataset.item = item;
                    $(myBoton).on('click', deleteItemCart);
                    // Uno los nodos.
                    myNodo.appendChild(myBoton);
                    DOMcart.appendChild(myNodo);
                });
            }

            /**********************************************
             * Evento para borrar un elemento del carrito *
             **********************************************/
            function deleteItemCart(event) {

                // Obtengo el ID de la oferta.
                const id = event.target.dataset.item;
                // Borro todas las ofertas.
                cart = cart.filter((offerId) => {
                    return offerId !== id;
                });
                // Actualizo el Local Storage.
                localStorage.setItem("cart", JSON.stringify(cart));
                // Vuelvo a renderizar el carrito.
                renderCart();
                // Calculo de nuevo el precio total.
                calculateTotal();
            }

            /*********************************************************************
             * Calcula el precio total teniendo en cuenta las ofertas repetidass *
             *********************************************************************/
            function calculateTotal() {
                // Limpio el total anterior.
                total = 0;
                // Recorro el array del carrito.
                cart.forEach((item) => {
                    // De cada elemento obtengo su precio.
                    const myItem = dataBase.filter((itemBD) => {
                        return itemBD.id === parseInt(item);
                    });
                    total = total + myItem[0].price;
                });
                // Renderizo el precio en el HTML.
                DOMtotal.textContent = total.toLocaleString('es-es');
            }

            /********************
             * Varia el carrito *
             ********************/
            function emptyCart() {

                // Limpio las ofertas guardadas.
                cart = [];
                // Actualizo el Local Storage.
                localStorage.setItem("cart", JSON.stringify(cart));
                // Renderizo los cambios.
                renderCart();
                calculateTotal();
            }

            function buyNow() {

                if (cart.length > 0) {

                    alert("GRACIAS POR SU COMPRA!");

                    emptyCart();

                } else {

                    alert("Debe elegir al menos una oferta");

                }
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const DOMtotal = document.querySelector('#total');

            renderCart();

            calculateTotal()

            let btnEmpty = $('#btn-empty');
            $(btnEmpty).on('click', emptyCart);

            let btnBuy = $('#btn-buy');
            $(btnBuy).on('click', buyNow);
        });
});