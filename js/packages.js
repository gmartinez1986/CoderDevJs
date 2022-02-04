$(document).ready(function () {

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
                //Los paquetes con idPackage = 2(dos) corresponden a destinos de Argentina.
                case 2:
                    packages = data.packages.filter(package => package.idPackage == 2);
                    $("#title1").html("Paquetes Locales");
                    $("#title2").html("Argentina");
                    break;
                //Los paquetes con idPackage = 3(tres) corresponden a destinos del Caribe.
                case 3:
                    packages = data.packages.filter(package => package.idPackage == 3);
                    $("#title1").html("Paquetes Internacionales");
                    $("#title2").html("Caribe");
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
                    myCardPriceBold.textContent = `Precio: $${info.price}`;
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
            }

            renderDestination();
        });
});