const translations = {
    en: {
        home: "Home",
        featured: "Featured",
        products: "Products",
        testimonial: "Testimonial",
        contact: "Contact",
        language: "Language",
        featuredProducts: "Featured Products",
        ourProductsLoved: "Our products are being loved by our customers.",
        productName: "Product Name",
        offerPrice: "Offer Price",
        color: "Color",
        buyNow: "Buy Now",
        allOverTheWorld: "All Over The World",
        moneyBackGuarantee: "Money Back Guarantee",
        fastFreeShipping: "Fast & Free Shipping",
        ourBestProduct: "Our Best Product",
        weProvideBestProducts: "We provide best products for our customers.",
        whatOurClientsSay: "What Our Clients Say",
        bestFragrance: "Best Fragrance!",
        thankYou: "Thank You!",
        imImpressed: "I'm Impressed!",
        contactUs: "Contact Us",
        feelFreeToSendMessage: "Feel free to send us a message about anything. We always appreciate you.",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send",
        testimonial1: "Be-Mistique is hands down the best fragrance I’ve ever tried! The scent lasts all day, and I always get compliments when I wear it. Truly a signature scent I can’t live without! — Robert Downey Jr.",
        testimonial2: "I recently bought Be-Mistique for my husband, and I have to say, I’m absolutely impressed! The fragrance is sophisticated, elegant, and has a unique depth that lasts all day. I’m so happy with the choice. Be-Mistique truly knows how to create a perfect fragrance! — Scarlett Johansson",
        testimonial3: "As someone who has created my own fragrance line, I know the dedication it takes to craft a truly memorable scent. But when I experienced Be-Mistique, I had to admit—it’s on a different level. The quality, sophistication, and long-lasting effect set it apart. Be-Mistique redefines what a great fragrance should be. — CR7",
        shippingDescription: "We ensure that your favorite fragrances reach you, no matter where you are. We offer fast and secure worldwide shipping, working with the best courier services to guarantee that your order arrives in perfect condition!",
        moneyBackDescription: "We want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, we offer a hassle-free Money-Back Guarantee!",
        fastShippingDescription: "Enjoy fast and free shipping on all orders over $100. We make sure your fragrance arrives quickly and at no extra cost, so you can experience your new scent sooner. Terms and conditions apply!"
    },
    es: {
        home: "Inicio",
        featured: "Destacado",
        products: "Productos",
        testimonial: "Testimonio",
        contact: "Contacto",
        language: "Idioma",
        featuredProducts: "Productos Destacados",
        ourProductsLoved: "Nuestros productos están siendo amados por nuestros clientes.",
        productName: "Nombre del Producto",
        offerPrice: "Precio de Oferta",
        color: "Color",
        buyNow: "Comprar Ahora",
        allOverTheWorld: "En Todo El Mundo",
        moneyBackGuarantee: "Garantía de Devolución de Dinero",
        fastFreeShipping: "Envío Rápido y Gratis",
        ourBestProduct: "Nuestros Mejores Productos",
        weProvideBestProducts: "Proveemos los mejores productos para nuestros clientes.",
        whatOurClientsSay: "Lo Que Dicen Nuestros Clientes",
        bestFragrance: "¡Mejor Fragancia!",
        thankYou: "¡Gracias!",
        imImpressed: "¡Estoy Impresionado!",
        contactUs: "Contáctanos",
        feelFreeToSendMessage: "Siéntete libre de enviarnos un mensaje sobre cualquier cosa. Siempre te apreciamos.",
        name: "Nombre",
        email: "Correo Electrónico",
        message: "Mensaje",
        send: "Enviar",
        testimonial1: "¡Be-Mistique es sin duda la mejor fragancia que he probado! El aroma dura todo el día y siempre recibo cumplidos cuando lo uso. ¡Realmente una fragancia distintiva de la que no puedo prescindir! — Robert Downey Jr.",
        testimonial2: "Recientemente compré Be-Mistique para mi esposo, y tengo que decir que estoy absolutamente impresionada. La fragancia es sofisticada, elegante y tiene una profundidad única que dura todo el día. Estoy muy contenta con la elección. ¡Be-Mistique realmente sabe cómo crear una fragancia perfecta! — Scarlett Johansson",
        testimonial3: "Como alguien que ha creado mi propia línea de fragancias, sé la dedicación que se necesita para crear un aroma verdaderamente memorable. Pero cuando experimenté Be-Mistique, tuve que admitir que está en un nivel diferente. La calidad, la sofisticación y el efecto duradero lo distinguen. Be-Mistique redefine lo que debe ser una gran fragancia. — CR7",
        shippingDescription: "Nos aseguramos de que tus fragancias favoritas te lleguen, sin importar dónde estés. Ofrecemos envíos rápidos y seguros a nivel mundial, trabajando con los mejores servicios de mensajería para garantizar que tu pedido llegue en perfectas condiciones.",
        moneyBackDescription: "Queremos que estés completamente satisfecho con tu compra. Si por alguna razón no estás contento con tu pedido, ofrecemos una garantía de devolución de dinero sin complicaciones.",
        fastShippingDescription: "Disfruta de envío rápido y gratuito en todos los pedidos superiores a $100. Nos aseguramos de que tu fragancia llegue rápidamente y sin costo adicional, para que puedas disfrutar de tu nuevo aroma lo antes posible. ¡Aplican términos y condiciones!"
    }
};

document.getElementById('es').addEventListener('click', (event) => {
    event.preventDefault();
    changeLanguage('es');
});

document.getElementById('en').addEventListener('click', (event) => {
    event.preventDefault();
    changeLanguage('en');
});

function changeLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelector('a[href="#hero"]').innerHTML = `<i class="fas fa-home"></i> ${translations[lang].home}`;
    document.querySelector('a[href="#featured"]').innerHTML = `<i class="fa fa-fire"></i> ${translations[lang].featured}`;
    document.querySelector('a[href="#products"]').innerHTML = `<i class="fa fa-spray-can"></i> ${translations[lang].products}`;
    document.querySelector('a[href="#testimonial"]').innerHTML = `<i class="fa fa-quote-left"></i> ${translations[lang].testimonial}`;
    document.querySelector('a[href="#contact"]').innerHTML = `<i class="fas fa-address-card"></i> ${translations[lang].contact}`;
    document.querySelector('.dropbtn').innerHTML = `<i class="fas fa-address-card"></i> ${translations[lang].language}`;

    document.querySelector('#featured h2').textContent = translations[lang].featuredProducts;
    document.querySelector('#featured p').textContent = translations[lang].ourProductsLoved;

    document.querySelectorAll('.featured-description p').forEach((element, index) => {
        const productName = translations[lang].productName;
        const offerPrice = translations[lang].offerPrice;
        const color = translations[lang].color;
        const productDetails = [
            { name: "The Man Company Body Perfume", price: "$24.00", color: "Blue" },
            { name: "The Man Company Body Perfume", price: "$24.50", color: "Golden" },
            { name: "The Man Company Body Perfume", price: "$22.50", color: "Black" }
        ];

        element.innerHTML = `
            <b>${productName}:</b> ${productDetails[index].name}
            <br>
            <b>${offerPrice}:</b> <del>$30</del> ${productDetails[index].price}
            <br>
            <b>${color}:</b> ${productDetails[index].color}.
        `;
    });

    document.querySelectorAll('.buynow').forEach(element => {
        element.textContent = translations[lang].buyNow;
    });

    document.querySelector('.icon1 h3').textContent = translations[lang].allOverTheWorld;
    document.querySelector('.icon1 p').textContent = translations[lang].shippingDescription;
    document.querySelector('.icon2 h3').textContent = translations[lang].moneyBackGuarantee;
    document.querySelector('.icon2 p').textContent = translations[lang].moneyBackDescription;
    document.querySelector('.icon3 h3').textContent = translations[lang].fastFreeShipping;
    document.querySelector('.icon3 p').textContent = translations[lang].fastShippingDescription;

    document.querySelector('#products h2').textContent = translations[lang].ourBestProduct;
    document.querySelector('#products p').textContent = translations[lang].weProvideBestProducts;

    document.querySelector('#testimonial h2').textContent = translations[lang].whatOurClientsSay;
    document.querySelector('#testimonial p').textContent = translations[lang].weProvideBestProducts;

    document.querySelectorAll('.customers h3')[0].textContent = translations[lang].bestFragrance;
    document.querySelectorAll('.customers h3')[1].textContent = translations[lang].thankYou;
    document.querySelectorAll('.customers h3')[2].textContent = translations[lang].imImpressed;

    document.querySelectorAll('.customers p')[0].textContent = translations[lang].testimonial1;
    document.querySelectorAll('.customers p')[1].textContent = translations[lang].testimonial2;
    document.querySelectorAll('.customers p')[2].textContent = translations[lang].testimonial3;

    document.querySelector('#contact h2').textContent = translations[lang].contactUs;
    document.querySelector('#contact p').textContent = translations[lang].feelFreeToSendMessage;

    document.querySelector('label[for="name"]').textContent = translations[lang].name;
    document.querySelector('label[for="email"]').textContent = translations[lang].email;
    document.querySelector('label[for="message"]').textContent = translations[lang].message;
    document.querySelector('button[type="submit"]').textContent = translations[lang].send;
}


document.addEventListener('DOMContentLoaded', function () {
    const lightboxLinks = document.querySelectorAll('.lightbox');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.lightbox-modal .close');

    lightboxLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            if (href.endsWith('.mp4')) {
                lightboxImage.style.display = 'none';
                lightboxVideo.style.display = 'block';
                lightboxVideo.querySelector('source').setAttribute('src', href);
                lightboxVideo.load();
            } else {
                lightboxVideo.style.display = 'none';
                lightboxImage.style.display = 'block';
                lightboxImage.setAttribute('src', href);
            }
            lightboxModal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function () {
        lightboxModal.style.display = 'none';
        lightboxVideo.pause();
    });

    window.addEventListener('click', function (event) {
        if (event.target === lightboxModal) {
            lightboxModal.style.display = 'none';
            lightboxVideo.pause();
        }
    });
});