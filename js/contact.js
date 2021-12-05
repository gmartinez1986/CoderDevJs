
class Contact {

    constructor(name, surname, email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }
}

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
    let surname = document.getElementById('txtSurname').value;
    let email = document.getElementById('txtEmail').value;

    const contact1 = new Contact(name, surname, email);

    if(ValidateForm()){

    }
}

function ValidateForm() { 

    return true;
}