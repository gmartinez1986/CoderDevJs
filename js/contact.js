

//----------------------------------------------------------------------------------------------
//Función que devuelve TRUE si el carácter evaluado es un numero, sino devuelve FALSE.
//Esta función se utiliza en evento "onkeypress" en los input de tipo text para que el usuario solo ingrese numeros.
function onlyNumberKey(evt) {
          
    //Solo se permiten caracteres ASCII en ese rango.
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}


function SendContact() { 

    let name = document.getElementById('txtName').value;

    if(ValidateForm()){

    }
}

function ValidateForm() { 

    return true;

}