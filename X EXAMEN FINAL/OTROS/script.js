function validarLogin() {
    var usuario = document.getElementById('usuario').value;
    var clave = document.getElementById('clave').value;

    if (usuario === 'cenfo' && clave === '123') {
        Swal.fire({
            title: '¡Inicio de sesión exitoso!',
            text: 'Redirigiendo...',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000 // 2 segundos
        }).then(() => {
            window.location.href = 'landing.html'; // Redirige a la página de proyectos
        });
        return false;
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Usuario o clave incorrectos',
            icon: 'error'
        });
        return false;
    }
}


<script>
    const translations = {
        en: {
            productName: "Product Name",
            offerPrice: "Offer Price",
            color: "Color",
            buyNow: "Buy Now",
            allOverTheWorld: "All Over The World",
            loremIpsum: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque quos ipsa iste animi doloribus, nam odit inventore magni quidem voluptatum placeat, rerum vero nemo quis ex? Minus ullam"
        },
        es: {
            productName: "Nombre del Producto",
            offerPrice: "Precio de Oferta",
            color: "Color",
            buyNow: "Comprar Ahora",
            allOverTheWorld: "En Todo El Mundo",
            loremIpsum: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque quos ipsa iste animi doloribus, nam odit inventore magni quidem voluptatum placeat, rerum vero nemo quis ex? Minus ullam"
        }
    };

    document.getElementById('es').addEventListener('click', () => {
        changeLanguage('es');
    });

    document.getElementById('en').addEventListener('click', () => {
        changeLanguage('en');
    });

    function changeLanguage(lang) {
        document.documentElement.lang = lang;

        document.querySelectorAll('.featured-description p').forEach((element, index) => {
            element.innerHTML = `
                <b>${translations[lang].productName}:</b> The Man Company Body Perfume.
                <br>
                <b>${translations[lang].offerPrice}:</b> <del>$30</del> $24.00
                <br>
                <b>${translations[lang].color}:</b> Blue.
            `;
        });

        document.querySelectorAll('.buynow').forEach(element => {
            element.textContent = translations[lang].buyNow;
        });

        document.querySelector('.icon1 h3').textContent = translations[lang].allOverTheWorld;
        document.querySelector('.icon1 p').textContent = translations[lang].loremIpsum;
    }