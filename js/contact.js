
/****************************************************************
 * Vincular eventos a los distintos elementos según corresponda *
 ****************************************************************/
$(document).ready(function() {

    //----------------------------------------------------------------------------------------------
    //Función que devuelve TRUE si el carácter evaluado es un numero, sino devuelve FALSE.
    //Esta función se utiliza en evento "onkeypress" en los input de tipo text para que el usuario solo ingrese numeros.
    $("#txtPhone").keypress(function(evt){
        //Solo se permiten caracteres ASCII en ese rango.
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            evt.preventDefault();
    });

    $("#sendContact").click(function(){

        let name = $('#txtName').val();
        let surname = $('#txtSurname').val();
        let email = $('#txtEmail').val();
        let phone = $('#txtPhone').val();
        let newsLetter = $('#ckNewsLetter').checked;
        let comments = $('#txtComments').val();
    
        //Objeto contacto.
        const contact1 = new Contact(name, surname, email, phone, newsLetter, comments);
    
        //Validar info ingresada.
        if(contact1.ValidateContact()){

            //Hago una llamada GET utilizando AJAX, para obtener los personajes de Harry Potter.
            $.ajax({
                method: "GET",
                url: "http://hp-api.herokuapp.com/api/characters",
                success: function(res){

                    $('#frmContact').trigger("reset");
                    //Tomo el nombre del primer personaje.
                    alert(`Se envió la información, ${res[0].name} te agradece.`);
                }
            });
        }
    });

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
                $('#txtName').focus();
                return false;
            }

            if(this.surname == ""){
                alert("Debe ingresar un Apellido");
                $('#txtSurname').focus();
                return false;
            }

            if(this.email == ""){
                alert("Debe ingresar un Email");
                $('#txtEmail').focus();
                return false;
            }

            if(this.phone == ""){
                alert("Debe ingresar un Telefono");
                $('#txtPhone').focus();
                return false;
            }

            return true;
        }
    }
});