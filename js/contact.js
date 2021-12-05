
class Contact {

    constructor(name, surname, email, phone, newsLetter, comments) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.newsLetter = newsLetter;
        this.comments = comments;
    }

    ValidateContact() { 

        if(this.name == ""){
            alert("Debe ingresar un nombre");
            document.getElementById('txtName').focus();
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
        return false;
    return true;
}


function SendContact() { 

    let name = document.getElementById('txtName').value;
    let surname = document.getElementById('txtSurname').value;
    let email = document.getElementById('txtEmail').value;
    let phone = document.getElementById('txtPhone').value;
    let newsLetter = document.getElementById('ckNewsLetter').value;
    let comments = document.getElementById('txtComments').value;

    const contact1 = new Contact(name, surname, email, phone, newsLetter, comments);

    if(contact1.ValidateContact()){

    }
}