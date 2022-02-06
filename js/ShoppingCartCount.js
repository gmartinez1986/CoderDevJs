$(document).ready(function () {

    //Actualizo el contador con el numero de paquetes turísticos seleccionados.
    function renderCount(){

        if(cart.length > 0){
            $('#count').addClass("badge on");
            $('#count').html(cart.length);
        }
    }

    // Inicializo el carrito, en caso de que el Local Storege tenga un carrito pre cargado, uso la información pre cargada.
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    renderCount();
});