// Carga de la función init
window.addEventListener('load', initContactForm, false);

// Función inicial
function initContactForm() {
    // Declaración de variables
    let nombre = document.getElementById('nombreTxt');
    let apellido = document.getElementById('apellidoTxt');
    let email = document.getElementById('emailTxt');
    let numero = document.getElementById('numberTxt');
    let mensaje = document.getElementById('mensajeTxt');
    let alerta = document.getElementById('mensajeAlertContact');
    let form = document.getElementById('contactForm');

    // Expresión regular para validar el email
    let expressionEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    // Función del formulario Enviar
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Asignar los valores de los inputs a variables
        let nombreValue = nombre.value;
        let apellidoValue = apellido.value;
        let emailValue = email.value;
        let numeroValue = numero.value;
        let mensajeValue = mensaje.value;

        console.log('Enviando formulario...');
        console.log('Nombre:', nombreValue);
        console.log('Apellido:', apellidoValue);
        console.log('Email:', emailValue);
        console.log('Número:', numeroValue);
        console.log('Mensaje:', mensajeValue);

        // Condicionales anidadas para validar cada campo del formulario
        if (nombreValue === "" || apellidoValue === "" || emailValue === "" || numeroValue === "" || mensajeValue === "") {
            alerta.textContent = 'Debe llenar todos los campos';
            alerta.classList.add('alertaRoja');
            alerta.classList.remove('alertaVerde');
            console.log('Debe llenar todos los campos');
        } else if (expressionEmail.test(emailValue) === false) {
            alerta.textContent = "Email inválido";
            alerta.classList.add('alertaRoja');
            alerta.classList.remove('alertaVerde');
            console.log('Email inválido');
        } else {
            // Si NO existe error en los campos validados se envían datos al servidor de correo
            alerta.textContent = "Mensaje enviado";
            alerta.classList.add('alertaVerde');
            alerta.classList.remove('alertaRoja');
            console.log('Mensaje enviado');

            // service ID/template ID/ID form/public key cuenta
            // el id del formulario es #contactForm
            emailjs.sendForm('service_ygvlsjh', 'template_zs2wvdf', '#contactForm', 'J4PMBE-SURn2-tei3')
           
            // Carga de la función limpiar
            limpiar();
        }
    });

    function limpiar() {
        nombre.value = "";
        apellido.value = "";
        email.value = "";
        numero.value = "";
        mensaje.value = "";
    }
}