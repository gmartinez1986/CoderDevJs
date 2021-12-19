
/****************************************************************
 * Vincular eventos a los distintos elementos según corresponda *
 ****************************************************************/
let txtPhone = document.getElementById('txtPhone');
txtPhone.addEventListener('keypress', onlyNumberKey);


let sendContact = document.getElementById('sendContact');
sendContact.addEventListener('click', SendContact);

//Clase contacto.
class Contact {

    constructor(name, surname, email, phone, newsLetter, comments) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.newsLetter = newsLetter;
        this.comments = comments;
    }

    //Valido la información ingresada.
    ValidateContact() { 

        if(this.name == ""){
            alert("Debe ingresar un Nombre");
            document.getElementById('txtName').focus();
            return false;
        }

        if(this.surname == ""){
            alert("Debe ingresar un Apellido");
            document.getElementById('txtSurname').focus();
            return false;
        }

        if(this.email == ""){
            alert("Debe ingresar un Email");
            document.getElementById('txtEmail').focus();
            return false;
        }

        if(this.phone == ""){
            alert("Debe ingresar un Telefono");
            document.getElementById('txtPhone').focus();
            return false;
        }

        return true;
    }
}

//----------------------------------------------------------------------------------------------
//Función que devuelve TRUE si el carácter evaluado es un numero, sino devuelve FALSE.
//Esta función se utiliza en evento "onkeypress" en los input de tipo text para que el usuario solo ingrese numeros.
function onlyNumberKey(evt) {

    //Solo se permiten caracteres ASCII en ese rango.
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        evt.returnValue = false;
    evt.returnValue = true;
}

//Función para enviar info de contacto.
function SendContact() { 

    let name = document.getElementById('txtName').value;
    let surname = document.getElementById('txtSurname').value;
    let email = document.getElementById('txtEmail').value;
    let phone = document.getElementById('txtPhone').value;
    let newsLetter = document.getElementById('ckNewsLetter').checked;
    let comments = document.getElementById('txtComments').value;

    //Objeto contacto.
    const contact1 = new Contact(name, surname, email, phone, newsLetter, comments);

    //Validar info ingresada.
    if(contact1.ValidateContact()){

        alert("Se envio la información");
        document.getElementById('frmContact').reset();
    }
}