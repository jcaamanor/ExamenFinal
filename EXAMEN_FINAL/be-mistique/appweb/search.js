document.querySelector('.btn-search').addEventListener('click', function() {
    const searchTerm = document.querySelector('#product-search').value.toLowerCase();
    const products = document.querySelectorAll('.cart-products-added .product'); // Ajusta el selector según tu estructura de productos

    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase(); // Ajusta el selector según tu estructura de productos
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});