$(document).ready(function () {

    //Busco los destinos en el archivo JSON.
    fetch('../js/dataBase.json')
        .then(response => response.json())
        .then(function (data) {

            //Busco el IdDestino por query string.
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });

            let destination = [];

            switch (parseInt(params.IdDestination)) {
                case 1:
                    destination = data.argentina;
                    break;
                default:

                    break;
            }


        });

});