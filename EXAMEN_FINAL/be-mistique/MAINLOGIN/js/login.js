//Microinteracciones JSON
//https://lottiefiles.com/featured



/*conexion con HTML usando el id btn-login y cargando la funcion llamada login*/
document.getElementById("btn-login").addEventListener("click", login);


/*funcion que valida el login*/
function validation_alert(ptext) {
    swal.fire({
        /* icon: "error",*/
        title: "Por favor verifica los datos ingresados.",
        text: ptext,
        confirmButtonText: "Intentar nuevamente",
        confirmButtonColor: "#0063be",
        html: '<div id="lottie-container" style="width: 200px; height: 200px;"></div> <br><p>' + ptext + " </p>",
        didOpen: () => {
            // Destruir cualquier animación existente en el contenedor
            const container = document.getElementById('lottie-container');
            if (container) {
                // Destruir la animación existente
                lottie.destroy();
                // Limpiar el contenedor
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            }
            // Cargar la nueva animación
            const animation = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: './json/error1.json' // Ruta al archivo JSON de la animación
            });
            // Ajustar la velocidad de la animación al doble
            animation.setSpeed(2);
        }
    });
}





//funcion login
function login() {


    let user_input = document.getElementById("in-txt-user").value;
    let pass_input = document.getElementById("in-txt-pass").value;
    //declaracion de los datos usuario y password respectivamente
    let username = "cenfo";
    let password = "123";
    //identificadores de los campos username y password
    let input = [user_input, pass_input];
    let input_id = ["in-txt-user", "in-txt-pass"];
    let error_count = 0;
    let text = "";
    //ciclo FOR que hace un recorrido con la clase llamada error que permite poner la franja roja del error
    for (let i = 0; i < input.length; i++) {
        document.getElementById(input_id[i]).classList.remove("error");
        if (input[i] == "") {
            //este es el texto que llevar el parametro de la funcion validación_alert
            text = "Validar si hay espacios vacios en los formularios.";
            //carga la funcion
            validation_alert(text);
            document.getElementById(input_id[i]).classList.add("error");
            error_count++;
        }
    }

    //validacion si los campos username y password son iguales
    if (error_count == 0) {
        if (user_input == username && pass_input == password) {

            Swal.fire({
                title: '<h2 style="text-align: center;">Bienvenido de vuelta a Be-Mistique!</h2>',
                html: '<div id="lottie-container" style="width: 100%; height: 200px;"></div><br>Estamos cargando los datos de tu cuenta.<br><br><progress value="0" max="100" id="progressBar"></progress>',
                timer: 5000,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getHtmlContainer().querySelector('#progressBar');
                    timerInterval = setInterval(() => {
                        progressBar.value = (Swal.getTimerLeft() / 50);
                    }, 100);

                    lottie.loadAnimation({
                        container: document.getElementById('lottie-container'),
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: 'json/passed.json',
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        }
                    }).setSpeed(0.1); // Ajusta la velocidad de la animación (0.5 es la mitad de la velocidad normal)

                    Swal.showLoading();
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then(() => {
                window.location.href = '../landing.html';
         


                // aca va el landing page
            });
        } else {
            text = "Usuario o contraseña incorrecta.";
            //carga la funcion de arriba
            validation_alert(text);
        }
    }
}