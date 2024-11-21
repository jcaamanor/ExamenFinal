window.addEventListener('load', initSubscription, false);

function initSubscription() {
    let email = document.getElementById('inscriptionTxt');
    let btnEnviar = document.getElementById('btnSendSubscription');
    let expressionEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let alerta = document.getElementById('mensajeAlertSubscription');
    let popupShown = false;

    // Cargar la animación Lottie
    let animation = lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'js/suscripcion.json' // Ruta al archivo JSON de la animación
    });

    // Controlar la velocidad de la animación
    document.getElementById('lottie-animation').addEventListener('mouseover', function() {
        animation.setSpeed(2); // Duplicar la velocidad
    });

    document.getElementById('lottie-animation').addEventListener('mouseout', function() {
        animation.setSpeed(1); // Velocidad normal
    });

    btnEnviar.onclick = function() {
        email = inscriptionTxt.value;

        if (email === "") {
            alerta.textContent = 'El campo email está vacío';
            alerta.classList.add('alertaRoja');
            alerta.classList.remove('alertaVerde');
        } else if (expressionEmail.test(email) === false) {
            alerta.textContent = 'Email inválido';
            alerta.classList.add('alertaRoja');
            alerta.classList.remove('alertaVerde');
        } else {
            alerta.textContent = 'Su registro fue exitoso';
            alerta.classList.add('alertaVerde');
            alerta.classList.remove('alertaRoja');

            emailjs.sendForm('service_ygvlsjh', 'template_w5wl8sq', '#subscriptionForm', 'J4PMBE-SURn2-tei3')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessAnimation();
                }, function(error) {
                    console.log('FAILED...', error);
                });
            cleanInputs();
        }
    }

    // Mostrar el banner al hacer scroll down solo una vez
    window.addEventListener('scroll', function() {
        if (!popupShown && window.scrollY > 100) { // Ajusta el valor de 100 según sea necesario
            showPopup();
            popupShown = true;
        }
    });
}

function showPopup() {
    const popupBanner = document.getElementById('popupBanner');
    popupBanner.style.display = 'flex';
    setTimeout(() => {
        popupBanner.classList.add('fade-in');
    }, 10); // Pequeño retraso para permitir que la transición ocurra
}

function showSuccessAnimation() {
    const popupBanner = document.getElementById('popupBanner');
    popupBanner.classList.remove('fade-in');
    popupBanner.classList.add('fade-out');
    setTimeout(() => {
        popupBanner.style.display = 'none';
        popupBanner.classList.remove('fade-out');
    }, 500); // Duración de la animación
}

function cleanInputs() {
    document.getElementById('inscriptionTxt').value = '';
}

document.getElementById('btnSkipSubscription').onclick = function() {
    // Cerrar el formulario
    document.getElementById('contactForm').style.display = 'none';
};