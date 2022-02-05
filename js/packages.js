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
    fetch('../js/dataBase.json')
        .then(response => response.json())
        .then(function (data) {

            //Busco el idPackage por query string.
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });

            let packages = [];

            switch (parseInt(params.idPackage)) {
                //Filtro por los paquetes con idPackage = 2(dos) corresponden a destinos de Argentina.
                case Packages.Argentina:
                    packages = data.packages.filter(package => package.idPackage == Packages.Argentina);
                    $("#title1").html("Paquetes Locales");
                    $("#title2").html("Argentina");
                    break;
                //Filtro por los paquetes con idPackage = 3(tres) corresponden a destinos del Caribe.
                case Packages.Caribbean:
                    packages = data.packages.filter(package => package.idPackage == Packages.Caribbean);
                    $("#title1").html("Paquetes Internacionales");
                    $("#title2").html("Caribe");
                    break;
                //Filtro por los paquetes con idPackage = 4(cuatro) corresponden a destinos de Brasil.
                case Packages.Brasil:
                    packages = data.packages.filter(package => package.idPackage == Packages.Brasil);
                    $("#title1").html("Paquetes Internacionales");
                    $("#title2").html("Brasil");
                    break;
                //Filtro por los paquetes con idPackage = 5(cinco) corresponden a destinos de Europa.
                case Packages.Europe:
                    packages = data.packages.filter(package => package.idPackage == Packages.Europe);
                    $("#title1").html("Paquetes Internacionales");
                    $("#title2").html("Europa");
                    break;
                //Filtro por los paquetes con idPackage = 6(seis) corresponden a destinos Exóticos.
                case Packages.Exotic:
                    packages = data.packages.filter(package => package.idPackage == Packages.Exotic);
                    $("#title1").html("Paquetes Internacionales");
                    $("#title2").html("Exótico");
                    break;
                //En caso que no se encuentre el conjunto de paquetes que corresponde,
                //redirecciono a la pagina de error 404. 
                default:
                    location.replace("./404.html")
                    break;
            }

            /*********************************************************
             * Dibuja los destinos                                
             *********************************************************/
            function renderDestination() {
                const DOMitems = document.querySelector('#items');
                packages.forEach((info) => {

                    // Estructura
                    const myNode = document.createElement('div');
                    myNode.classList.add('col-xl-4', 'col-lg-6', 'col-md-6', 'col-sm-12', 'col-xs-12');
                    // Body
                    const myNodeBody = document.createElement('div');
                    myNodeBody.classList.add('card');

                    // Imagen
                    const myNodeImage = document.createElement('span');
                    myNodeImage.classList.add('packages--img', `packages--${info.imageDescription}`, 'card-img-top');

                    const myCardBody = document.createElement('div');
                    myCardBody.classList.add('card-body');

                    const myCardTitle = document.createElement('h5');
                    myCardTitle.classList.add('card-title');
                    myCardTitle.textContent = `${info.name}`;
                    myCardBody.appendChild(myCardTitle);

                    const myCardDescription = document.createElement('p');
                    myCardDescription.classList.add('card-text');
                    myCardDescription.textContent = `${info.description}`;
                    myCardBody.appendChild(myCardDescription);

                    const myCardPrice = document.createElement('p');
                    const myCardPriceBold = document.createElement('b');
                    myCardPriceBold.textContent = `Precio: $${info.price.toLocaleString('es-es')}`;
                    myCardPrice.appendChild(myCardPriceBold);
                    myCardBody.appendChild(myCardPrice);

                    // Boton 
                    const myNodeColButton = document.createElement('div');
                    myNodeColButton.classList.add('col-lg-6', 'col-md-6', 'col-sm-12', 'col-xs-12');
                    const myNodeButton = document.createElement('button');
                    myNodeButton.setAttribute('offerId', info.id);
                    myNodeButton.classList.add('btn', 'btn-invert', 'btn-md', 'btnAddOffer');
                    myNodeButton.textContent = '+';
                    myNodeColButton.appendChild(myNodeButton);
                    myCardBody.appendChild(myNodeButton)

                    // Insertamos
                    myNodeBody.appendChild(myNodeImage);
                    myNodeBody.appendChild(myCardBody);
                    myNode.appendChild(myNodeBody);
                    DOMitems.appendChild(myNode);
                });

                renderCount();
            }

            function renderCount() {

                if (cart.length > 0) {
                    $('#count').addClass("badge on");
                    $('#count').html(cart.length);
                }
            }

            // Inicializo el carrito, en caso de que el Local Storege tenga un carrito pre cargado, uso la información pre cargada.
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            renderDestination();

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

                    renderCount();

                });
            }

            /****************************************************************/
        });
});