$(document).ready(function () {

    //Enumeración de los distintos conjuntos de paquetes.
    const Packages = {
        Offers: 1,
        Argentina: 2,
        Caribbean: 3,
        Brasil: 4,
        Europe: 5
    }

    //Busco los paquetes turísticos en el archivo JSON.
    fetch('js/dataBase.json')
        .then(response => response.json())
        .then(function (data) {

            //Tomo las ofertas del archivo JSON.
            //Filtro los paquetes a partir de idPackage = 1(uno) -> Promociones.
            const dataBase = data.packages.filter(package => package.idPackage == Packages.Offers);

            //Ruta donde estan las imagenes.
            const imagePath = './assets/img/';

            /******************************************************
             * Dibuja todas las ofertas                           *
             ******************************************************/
            function renderOffers() {
                const DOMitems = document.querySelector('#items');
                dataBase.forEach((info) => {

                    // Estructura
                    const myNode = document.createElement('div');
                    myNode.classList.add('col-xl-4', 'col-lg-6', 'col-md-6', 'col-sm-12', 'col-xs-12');
                    // Body
                    const myNodeBody = document.createElement('div');
                    myNodeBody.classList.add('offers__offerContainer');
                    // Titulo
                    const myNodeTitle = document.createElement('h5');
                    myNodeTitle.classList.add('offers__offerContainer--title');
                    myNodeTitle.textContent = info.name;
                    // Imagen
                    const myNodeImage = document.createElement('div');
                    const myImage = document.createElement('img');
                    myImage.classList.add('offers__offerContainer--imgPromo');
                    myImage.setAttribute('src', imagePath + info.image);
                    myImage.setAttribute('alt', info.name);
                    myNodeImage.appendChild(myImage);
                    const myDescription = document.createElement('p');
                    myDescription.classList.add('offers__offerContainer--text');
                    myDescription.textContent = info.description;
                    myNodeImage.appendChild(myDescription);

                    const myNodeRow = document.createElement('div');
                    myNodeRow.classList.add('row');
                    const myNodeColPrice = document.createElement('div');
                    myNodeColPrice.classList.add('col-lg-6', 'col-md-6', 'col-sm-12', 'col-xs-12');

                    // Precio
                    const myNodePrice = document.createElement('p');
                    myNodePrice.classList.add('offers__offerContainer--price');
                    myNodePrice.textContent = `$ ${info.price}`;
                    myNodeColPrice.appendChild(myNodePrice);
                    myNodeRow.appendChild(myNodeColPrice);

                    // Boton 
                    const myNodeColButton = document.createElement('div');
                    myNodeColButton.classList.add('col-lg-6', 'col-md-6', 'col-sm-12', 'col-xs-12');
                    const myNodeButton = document.createElement('button');
                    myNodeButton.setAttribute('offerId', info.id);
                    myNodeButton.classList.add('btn', 'btn-invert', 'btn-md', 'btnAddOffer');
                    myNodeButton.textContent = '+';
                    myNodeColButton.appendChild(myNodeButton);
                    myNodeRow.appendChild(myNodeColButton)

                    // Insertamos
                    myNodeBody.appendChild(myNodeTitle);
                    myNodeBody.appendChild(myNodeImage);
                    myNodeBody.appendChild(myNodeRow);
                    myNode.appendChild(myNodeBody);
                    DOMitems.appendChild(myNode);
                });
            }

            /******************************************************
             * Dibuja todas las ofertas guardadas en el carrito   *
             ******************************************************/
            function renderCart(offerId) {
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

                    myNodo.textContent = `${numberUnitsItem} x ${myItem[0].name} - $ ${myItem[0].price}`;
                    // Boton de borrar.
                    const myBoton = document.createElement('button');
                    myBoton.classList.add('btn', 'btn-danger', 'mx-5');
                    myBoton.textContent = 'X';
                    myBoton.style.margin = '0.5rem';
                    myBoton.dataset.item = item;
                    $(myBoton).on('click', deleteItemCart);
                    // Uno los nodos.
                    myNodo.appendChild(myBoton);
                    // Oculto los elementos del carrito.
                    $(myNodo).hide();
                    // Identifico el elemento que se acaba de seleccionar.
                    if (item == offerId) {
                        // Muestro lentamente el elemento seleccionado.
                        $(myNodo).fadeIn(2000);
                    }
                    else {
                        // Sino es el elemento que se acaba de seleccionar, lo muestro.
                        $(myNodo).show();
                    }
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
                DOMtotal.textContent = total.toFixed(2);
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

            // Inicializo el carrito, en caso de que el Local Storege tenga un carrito pre cargado, uso la información pre cargada.
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let total = 0;

            const DOMcart = document.querySelector('#cart');
            const DOMtotal = document.querySelector('#total');

            renderOffers()
            // Calculo el total.
            calculateTotal();
            // Actualizo el carrito. 
            renderCart();

            /****************************************************************
            * Vincular eventos a los distintos elementos según corresponda *
            ****************************************************************/
            let btnAddOffer = $('.btnAddOffer');

            for (let i = 0; i < btnAddOffer.length; i++) {

                /**********************************************************
                 * Evento para añadir una oferta al carrito de compras    *
                 **********************************************************/
                $(btnAddOffer[i]).click(function (event) {

                    let offerId = $(event.target).attr('offerId');
                    // Ingreso oferta al carrito.
                    cart.push(offerId);

                    // Actualizo el Local Storage.
                    localStorage.setItem("cart", JSON.stringify(cart));

                    // Calculo el total.
                    calculateTotal();
                    // Actualizo el carrito. 
                    renderCart(offerId);
                });
            }

            let btnEmpty = $('#btn-empty');
            $(btnEmpty).on('click', emptyCart);

            let btnBuy = $('#btn-buy');
            $(btnBuy).on('click', buyNow);

            /****************************************************************/
        });
});