$(document).ready(function () {

    //Enumeración de los distintos conjuntos de paquetes.
    const Packages = {
        Offers: 1,
        Argentina: 2,
        Caribbean: 3,
        Brasil: 4,
        Europe: 5,
        Exotic: 6
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

            // Inicializo el carrito, en caso de que el Local Storege tenga un carrito pre cargado, uso la información pre cargada.
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            renderOffers()

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

                });
            }

            /****************************************************************/
        });
});