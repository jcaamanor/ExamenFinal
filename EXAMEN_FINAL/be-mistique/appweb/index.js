

const hide = (element) => {
    return element.classList.add('is-hidden');
};
const show = (element) => {
    return element.classList.remove('is-hidden');
};
const normalize = (str) => {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.toLowerCase();
    return str;
};
const showOverlay = () => {
    show(overlay);
};
const hiddeOverlay = () => {
    hide(overlay);
};
const bodyNoScroll = () => {
    document.body.classList.add('no-scroll');
};
const bodyScroll = () => {
    document.body.classList.remove('no-scroll');
};

/*                         ALGORITMO
1- Seleccionar los elementos necesarios y guardarlos en variables
2- Inicializar filtros. Recorrer todos los inputs de los filtros
y llamar a la funcion -filtrarproducts- si el usuario hace click en alguno.
3- Filtrarproducts (incluye varias funciones)
4- Inicializar boton de limpiar filtros y Ejecutar la funcion
LImpiar Filtros
*/
/**************  1- SELECCIONAR ELEMENTOS *********** */
const inputSearch = document.querySelector('#input-search');
const products = document.getElementsByClassName('product'); /*LISTA DE PRODUCTOS*/
const reviewFilters = document.getElementsByClassName('filter-review'); /*LISTA DE REVIEWS*/
const categoryFilters = document.getElementsByClassName('filter-category'); /* LISTA DE CATEGORIAS*/
const checkboxes = document.querySelectorAll('.filter'); /*LISTA DE CHECKBOXES*/
const clearBtn = document.querySelector('.clear-btn');
/**************  3- FILTRAR PRODUCTOS *********** */
/*----Chequea si hay checkbox chequeados ON */
const searchOn = () => {
    if (inputSearch.value.length !== 0) {
        return true;
    } else {
        return false;
    }
};
const categoryOn = () => {
    for (const filtro of categoryFilters) {
        if (filtro.checked) {
            return true;
        }
    }
    return false;
};
const reviewOn = () => {
    for (const filtro of reviewFilters) {
        if (filtro.checked) {
            return true;
        }
    }
    return false;
};
/* --------- Pasa Filtros por separado -----------*/
const passCategoryFilter = (product) => {
    const category = product.dataset.category;
    //selecciona UN solo filtro que coincide con la product y lo pone chequeado !!
    const categoryFilter = document.querySelector(`.filter-category[value="${category}"]`);
    return categoryFilter.checked;
};
const passReviewFilter = (product) => {
    const review = product.dataset.review;
    const reviewFilter = document.querySelector(`.filter-review[value="${review}"]`);
    return reviewFilter.checked;
};
const passInputSearch = (product) => {
    let name = product.dataset.name;
    let nameStandard = normalize(name);
    let inputSearchStandard = inputSearch.value;
    inputSearchStandard = normalize(inputSearchStandard);
    return nameStandard.includes(inputSearchStandard);
};
/* ------ Filtrado de cada Checkbox -------*/
const passAllFilters = (product) => {
    return (
        // condicion: si pasa filtro o no esta chequeado-incluyendo a todos
        (passCategoryFilter(product) || !categoryOn()) &&
        (passReviewFilter(product) || !reviewOn()) &&
        (passInputSearch(product) || !searchOn())
    );
};
/* ------- Actualizar products Filtrados ------ */
let productsQty = document.getElementById('products-qty');
const updateQtyProducts = () => {
    let contador = 0;
    for (const product of products) {
        if (passAllFilters(product)) {
            contador++;
        }
    }
    productsQty.innerText = `Mostrando ${contador} product(s) de ${products.length}`;
};
/* -------- Mostrar productos que pasen los filtros -------------*/
const showProducts = () => {
    for (const product of products) {
        hide(product); //Escondo todas las products para empezar
        if (passAllFilters(product)) {
            show(product);
        } else {
            hide(product);
        }
    }
};
/*-------- Inicio del proceso de filtrado ---------*/
const filterProducts = () => {
    showProducts();
    updateQtyProducts();
};
/******************💛💛💛 4- LIMPIAR FILTROS 💛💛💛********************* */
const clearSearchInput = () => {
  inputSearch.value = ''
};
const clearCheckboxesChequed = () => {
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            checkbox.checked = false;
        }
    }
};
const showAllProducts = () => {
    for (let product of products) {
        show(product);
    }
};
/************** 💛💛💛 2- INICIALIZAR FILTROS 💛💛💛*********** */
// Si hace click en un checkbox o inicia una busqueda-> Filtrar productos
for (let checkbox of checkboxes) {
    checkbox.onclick = () => {
        filterProducts();
    };
}
// Si empieza una busqueda por nombre
inputSearch.oninput = () => {
    filterProducts();
};
clearBtn.onclick = () => {
    clearCheckboxesChequed(); //destildo todos los checkboxes
    clearSearchInput(); // borro form de busqueda
    showAllProducts(); // vuelvo a mostrar todas los productos
    updateQtyProducts(); // actualiza el conteo de productos que muestra
};
/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                      LISTA DE PRODUCTOS:GRID o LIST
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
/** Algoritmo
 * 1- Seleccionar los botones de grid y list, y contenedor de productos
 * 2- Inicializar evento onclick para ambos botones
 * 3- Modificar layout de lista de productos:
 * agregar o quitar clases in-line o in-grid segun corresponda.
 * Mas agregar descripcion a cada tarjeta.
 */
/******************💛💛💛 1- SELECCIONAR BOTONES  💛💛💛***************/
const btnGrid = document.querySelector('#view-button-grid');
const btnList = document.querySelector('#view-button-list');
const productsListContainer = document.querySelector('.products-list');
const productsDescriptions = document.querySelectorAll('.product-description'); //todas las descripciones de los productos
/******************💛💛💛 2-MODIFICAR LAYOUT CONTENEDOR DE PRODUCTOS 💛💛💛***************/
showGrid = () => {
    productsListContainer.classList.remove('in-stack');
    productsListContainer.classList.add('in-grid');
    for (let p of products) {
        p.classList.remove('in-line-product');
    }
    for (let d of productsDescriptions) {
        hide(d);
    }
};
showList = () => {
    productsListContainer.classList.remove('in-grid');
    productsListContainer.classList.add('in-stack');
    for (let p of products) {
        p.classList.add('in-line-product');
    }
    for (let d of productsDescriptions) {
        show(d);
    }
};
/******************💛💛💛 3-INICIALIZAR EVENTO DE BOTONES GRID O LINE 💛💛💛***************/
btnGrid.onclick = () => {
    showGrid();
};
btnList.onclick = () => {
    showList();
};
/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                              FILTROS EN RESPONSIVE
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
const btnOpenFilters = document.querySelector('.open-filters-btn');
const btnCloseFilters = document.querySelector('.close-filters-btn');
const filtersAside = document.querySelector('.filters-aside');
btnOpenFilters.onclick = () => {
    filtersAside.classList.add('aside-responsive');
    filtersAside.classList.add('theme-sky-dark');
    filtersAside.style.display = 'block';
};
btnCloseFilters.onclick = () => {
    filtersAside.classList.remove('aside-responsive');
    filtersAside.classList.remove('theme-sky-dark');
    filtersAside.style.display = 'none';
};
/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                              CARRITO
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
/** Algoritmo
 * 1- Seleccionar todos los elementos necesarios
 * 2- Inicializar evento que escuche el on-click en el boton de abrir carrito
 * y otro que escuche el boton cerrar carrito
 * 3- Ir a la funcion Mostrar Carrito u Ocultar carrito 
 * segun corresponda.
 * Cuando se abre carrito mostrar overlay y evitar scroll en screen.
 * 4- Inicializar evento en Botones Comprar y en contador de 
 * productos del carrito
 * 5-Agregar Funcionalidades: contar productos del carrito y calcular
 * subtotal de la compra
 * 6-Agregar funcionalidades: dentro del carrito sumar mas productos
 * del mismo tipo o eliminarlos individualmente
 */
/******************💛💛💛 1-SELECCIONAR ELEMENTOS  💛💛💛***************/
const btnOpenCart = document.querySelector('.btn-cart');
const btnCloseCart = document.querySelector('.btn-close');
const cart = document.querySelector('.header-menu-add-to-card');
const overlay = document.querySelector('.overlay');
const cartSubtotalOutput = document.querySelectorAll('.cart-subtotal-value');
const allBtnAddToCart = document.querySelectorAll('.button-add-to-cart');
const counterProducts = document.querySelectorAll('.cart-qty');
const cartFullMsg = document.querySelector('.cart-full');
const cartEmptyMsg = document.querySelector('.cart-empty');
const carrito = document.querySelector('.cart-products-added');

let subtotalProductsAdded = 0; // empiezo con $0 de compra
/******************💛💛💛 3-MOSTRAR U OCULTAR CARRITO Y OVERLAY 💛💛💛***************/
const showCart = () => {
    show(cart);
  cart.classList.remove('menu-add-to-card-hidde');
  cart.setAttribute('aria-hidden', false)
    for (let c of counterProducts) {
        if (c.innerText == 0) {
            hide(cartFullMsg);
            show(cartEmptyMsg);
        }
    }
};
const hiddeCart = () => {
  cart.classList.add('menu-add-to-card-hidde');
  cart.setAttribute('aria-hidden', true)
    hide(cart);
    show(cartFullMsg);
    hide(cartEmptyMsg);
};
/******************💛💛💛 5-FUNCIONALIDADES DE SUMAR SUBTOTAL Y
 *                                CAMBIAR CONTADOR DE PRODUCTOS  💛💛💛***************/
const addCounterCart = () => {
    for (let c of counterProducts) {
        let counterNumber = Number(c.innerText);
        counterNumber++;
        c.innerText = counterNumber;
    }
};
const subtractCounterCart = () => {
    for (let c of counterProducts) {
        let counterNumber = Number(c.innerText);
        counterNumber--;
        c.innerText = counterNumber;
    }
};
/** Saber cual es el producto que compraron
 * comparando id del boton con id del producto */
const knowProduct = (btn,list) => {
    for (let x of list)
        if (x.dataset.id === btn.getAttribute('id')) {
            console.log(x.dataset.id)
            console.log(btn.getAttribute('id'))
            console.log(x.dataset.id === btn.getAttribute('id'))
            return x;
        }
};


/** Ir sumando cada producto comprado al valor de Subtotal (de todos los comprados)
 * para usarlo en el checkout (y calcular descuentos y recargos)
 */
const addSubtotal = (subtotal) => {
    //variable acumuladora de subtotales(precio de cada producto)
    subtotalProductsAdded = subtotalProductsAdded + Number(subtotal);
    // para mostrarlo en pantalla
    for (let c of cartSubtotalOutput) {
        c.innerText = subtotalProductsAdded;
    }
};
const subtractSubtotal = (subtotal) => {
    //variable acumuladora de subtotales(precio de cada producto)
    subtotalProductsAdded = subtotalProductsAdded - Number(subtotal);
    // para mostrarlo en pantalla
    for (let c of cartSubtotalOutput) {
        c.innerText = subtotalProductsAdded;
    }
};
addPriceToSubtotal = (btnAddToCart) => {
    /** Algoritmo
   * 1- Recibir el boton para saber su id 
   * 2- Buscar que id de tarjeta coincide con el id del boton
   * 3- saber el precio del producto y sumarlo al subtotal
   * 4- Identificar con una clase el producto agregado
   *   (para seleccionalos y mostrarlos en el carrito)
   */
    let productAdded = knowProduct(btnAddToCart, products);
    let subtotal = productAdded.dataset.price;
    addSubtotal(subtotal);
};
const obtenerPlantillaProductoAgregado = (id, nombre, precio, imagen) => {
    return `<article class="cart-product-added" data-id="${id}" data-qty="1" data-price=${precio}>
    <img src="${imagen}" alt="" class="cart-product-img" />
    <div class="cart-product-details">
      <div class="cart-product-info">
        <h3 class="cart-product-name">${nombre}</h3>
        <button  type="button" class="remove-from-cart-btn" id="${id}"><i class="far fa-trash-alt"></i></button>
      </div>
      <div class="cart-product-price-qty">
        <label>
          <input data-precio="${precio}" type="number" min="0" value="1" class="cart-product-qty" />
          unidades
        </label>
        <p class="cart-product-price">x $${precio}</p>
      </div>
    </div>
  </article>`;
};
const showProductOnCart = (btnAddToCart) => {
    let productAdded = knowProduct(btnAddToCart, products);
    const plantilla = obtenerPlantillaProductoAgregado(
        productAdded.dataset.id,
        productAdded.dataset.name,
        productAdded.dataset.price,
        productAdded.dataset.image
    );
    carrito.innerHTML += plantilla;
    
};
/******************💛💛💛 3-INICIALIZAR EVENTO MOSTRAR CARRITO 💛💛💛***************/
btnOpenCart.onclick = () => {
    showOverlay();
    overlay.style.zIndex = '2';
    bodyNoScroll();
    showCart();
};
btnCloseCart.onclick = () => {
    hiddeOverlay();
    overlay.style.zIndex = '1';
    bodyScroll();
    hiddeCart();
};
/******************💛💛💛 4-INICIALIZAR EVENTO SUMAR PRODUCTOS 💛💛💛***************/
const removeProductOfTheList = (btnRemove) => {
    /* Averiguar la tarjeta padre*/
    const allProductsAdded = document.querySelectorAll(".cart-product-added")   
    console.log(allProductsAdded)
    let productToRemove = knowProduct(btnRemove, allProductsAdded)
    let subtotal = productToRemove.dataset.price;
    console.log(subtotal)
    subtractSubtotal(subtotal)
    subtractCounterCart()
    productToRemove.remove();
    listenEventsOnCart();
};
const addProductToTheCartList = (inputQty) => {
    let qty = inputQty.getAttribute('value');
    console.log(qty)
    let subtotal = Number(inputQty.dataset.precio) * qty;
    console.log(subtotal)
    /**
     * Falta: 
     * -ver sumar o restar el monto si el numero crece o decrece
     * en relacion a la cantida anterior.
     * -Actualizar el subtotal de cada producto
     * si cambia su cantidad
     * -agregar condicion, si qty igual 0 mostrar mgs carrito vacio
     */
    addSubtotal(subtotal);
    addCounterCart();
    listenEventsOnCart();
};
/** Escucha eventos remover o agregar producto en carrito*/
const listenEventsOnCart = () => {
    const allBtnRemove = document.querySelectorAll('.remove-from-cart-btn');
    console.log(allBtnRemove)
    const allInputsProductQty = document.querySelectorAll('.cart-product-qty');
    for (btnRemove of allBtnRemove) {
        btnRemove.onclick = () => {
            console.log(btnRemove)
            removeProductOfTheList(btnRemove);
        };
    }
    for (inputQty of allInputsProductQty) {
        inputQty.onchange = () => {
            console.log("apretaste sumar producto")
            addProductToTheCartList(inputQty);
        };
    }
};
/** INICIALIZA BOTONES QUE AGREGAN O QUITAN PRODUCTOS  */
for (let btnAddToCart of allBtnAddToCart) {
    btnAddToCart.onclick = () => {
        addCounterCart();
        addPriceToSubtotal(btnAddToCart);
        showProductOnCart(btnAddToCart);
        listenEventsOnCart();
    };
}
/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                             MODALES CARRITO
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
/** Algoritmo
 * 1- Seleccionar elementos
 * 2-Inicializar eventos de boton vaciar carrito para
 * abrir modal
 * 3-Agregar Funcionalidad de vaciar carrito con boton
 * aceptar del modal
 */
/******************💛💛💛 1- SELECCIONAR ELEMENTOS 💛💛💛***************/
const btnOpenModalEmptyCart = document.querySelector('.btn-empty-cart');
const modalEmptyCart = document.querySelector('.modal-empty-cart');
const btnConfirmEmptyCart = document.querySelector('.confirm-cart-empty-btn');
const btnCancelEmptyCart = document.querySelector('.cancel-empty-cart-btn');
/******************💛💛💛 3- FUNCIONALIDAD DE VACIAR CARRITO 💛💛💛***************/
resetCounterCart = () => {
    for (let c of counterProducts) {
        c.innerText = '0';
    }
};
resetPriceToSubtotal = () => {
    subtotalProductsAdded = 0;
    for (let c of cartSubtotalOutput) {
        c.innerText = subtotalProductsAdded;
    }
};
hideAllProductsOnCart = () => {
    carrito.innerHTML = '';
};
const openModalEmptyCart = () => {
  show(modalEmptyCart);
  modalEmptyCart.setAttribute('aria-hidden', false)
};
const emptyCartConfirm = () => {
    resetCounterCart();
    resetPriceToSubtotal();
    hideAllProductsOnCart();
    showCart();
  hide(modalEmptyCart);
  overlay.style.zIndex = 2
  modalEmptyCart.setAttribute('aria-hidden', true)
};
/******************💛💛💛 2- INICIALIZAR EVENTO BTN VACIAR 💛💛💛***************/
btnOpenModalEmptyCart.onclick = () => {
    openModalEmptyCart();
    showOverlay();
    bodyNoScroll();
  overlay.style.zIndex = 4
};
btnConfirmEmptyCart.onclick = () => {
    emptyCartConfirm();
    hiddeOverlay();
    bodyScroll();
    hide(modalEmptyCart);
    overlay.style.zIndex = '1';
};
btnCancelEmptyCart.onclick = () => {
    hiddeOverlay();
    bodyScroll();
    hide(modalEmptyCart);
    overlay.style.zIndex = '1';
};
/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                             CHECKOUT
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
/**    Algoritmo
 * 1- Seleccionar todos los elementos
 * 2- Crear funcionalidad de abrir y cerrar Menu Checkout
 * 3- Crear funcionalidad de Descuentos y Recargos para 
 * calcular el total de la compra
 */
const btnOpenCheckout = document.querySelector('.btn-buy');
const btnFinishBuy = document.querySelector('.btn-finish-buy');
const btnCancelBuy = document.querySelector('.btn-cancel-buy');
const menuCheckout = document.querySelector('.menu-checkout');
/******************💛💛💛 2- ABRIR Y CERRAR CHECKOUT 💛💛💛***************/
const showCheckout = () => {
  show(menuCheckout);
  menuCheckout.setAttribute('aria-hidden', false)
  overlay.style.zIndex = 4
};
const hiddeCheckout = () => {
  hide(menuCheckout);
  menuCheckout.setAttribute('aria-hidden', true)
};
btnOpenCheckout.onclick = () => {
    showOverlay();
    overlay.style.zIndex = '3';
    bodyNoScroll();
    showCheckout();
    getTotal();
};
btnFinishBuy.onclick = () => {
    hiddeOverlay();
    overlay.style.zIndex = '1';
  bodyScroll();
  resetCounterCart();
    resetPriceToSubtotal();
  hideAllProductsOnCart();
  resetOptionsPay()
    hiddeCheckout();
    hiddeCart();
};
btnCancelBuy.onclick = () => {
    hiddeOverlay();
    overlay.style.zIndex = '1';
    bodyScroll();
    hiddeCheckout();
    hiddeCart();
};
/******************💛💛💛 3- CALCULAR PRECIO TOTAL DEL CHECKOUT 💛💛💛***************/
const allPayOptions = document.querySelectorAll('.pay-option');
// checkboxes
const cashOption = document.querySelector('#cash-debit');
const creditOption = document.querySelector('#credit');
const deliveryOption = document.querySelector('#delivery');
const discountOption = document.querySelector('#discount');
// output values span
const cartTaxValue = document.querySelector('.cart-tax-value');
const discountValue = document.querySelector('.cart-discount-value');
const deliveryValue = document.querySelector('.cart-delivery-value');
const cartTotalValue = document.querySelector('.cart-total-value');
//parrrafos
const cartTax = document.querySelector('.cart-tax');
const discount = document.querySelector('.cart-discount');
const delivery = document.querySelector('.cart-delivery');

let cartTaxValueCalculated = 0;
let deliveryPrice = 0;
let discountCalculated = 0;
let cartTotalValueCalculated;
cartTotalValue.textContent = subtotalProductsAdded;
const getCartTax = () => {
    cartTaxValueCalculated = subtotalProductsAdded * 0.1;
};
const addDeliveryPrice = () => {
    deliveryPrice = 50;
};
const getDiscount = () => {
    discountCalculated = -subtotalProductsAdded * 0.1;
};
getTotal = () => {
    if (creditOption.checked) {
        getCartTax();
        show(cartTax);
    } else {
        cartTaxValueCalculated = 0;
        hide(cartTax);
    }
    if (deliveryOption.checked) {
        addDeliveryPrice();
        show(delivery);
    } else {
        deliveryPrice = 0;
        hide(delivery);
    }
    if (discountOption.checked) {
        getDiscount();
        show(discount);
    } else {
        discountCalculated = 0;
        hide(discount);
    }
    // Mostrar en pantalla
    cartTaxValue.textContent = cartTaxValueCalculated.toFixed(2);
    deliveryValue.textContent = deliveryPrice.toFixed(2);
    discountValue.textContent = discountCalculated.toFixed(2);
    totalValueCalculated = subtotalProductsAdded + deliveryPrice + discountCalculated + cartTaxValueCalculated;
    cartTotalValue.textContent = totalValueCalculated.toFixed(2);
};
// inicializa calculo de precio total
for (let payOption of allPayOptions) {
    payOption.onclick = () => {
        getTotal();
    };
}
const resetOptionsPay = () => {
 cashOption.checked = true
 creditOption.checked = false 
 deliveryOption.checked = false
 discountOption.checked = false
}
document.getElementById('sort-options').addEventListener('change', function() {
    const sortValue = this.value;
    const productsList = document.querySelector('.products-list');
    const products = Array.from(productsList.querySelectorAll('.product'));
    let sortedProducts;
    switch(sortValue) {
        case 'price-desc':
            sortedProducts = products.sort((a, b) => 
                parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'))
            );
            break;
        case 'price-asc':
            sortedProducts = products.sort((a, b) => 
                parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'))
            );
            break;
        case 'name-asc':
            sortedProducts = products.sort((a, b) => 
                a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'))
            );
            break;
        case 'name-desc':
            sortedProducts = products.sort((a, b) => 
                b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'))
            );
            break;
        default:
            sortedProducts = products;
    }
    // Remover productos actuales
    productsList.innerHTML = '';
    // Añadir productos ordenados
    sortedProducts.forEach(product => {
        productsList.appendChild(product);
    });
});
//
// index.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado y analizado');
    // Seleccionar todos los botones de "Comprar"
    const addToCartButtons = document.querySelectorAll('.button-add-to-cart');
    console.log(`Se encontraron ${addToCartButtons.length} botones de "Comprar"`);
    // Verificar si se encontraron botones
    if (addToCartButtons.length === 0) {
        console.error('No se encontraron botones con la clase .button-add-to-cart');
        return;
    }
    // Añadir event listener a cada botón
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Botón "Comprar" clicado');
            // Obtener el elemento padre con la clase .product
            const product = this.closest('.product');
            if (!product) {
                console.error('Elemento .product no encontrado');
                return;
            }
            const productName = product.getAttribute('data-name');
            if (!productName) {
                console.error('Atributo data-name no encontrado en .product');
                return;
            }
            console.log(`Agregando al carrito: ${productName}`);
            // Emitir la alerta con SweetAlert2 personalizada
            Swal.fire({
                icon: 'info',
                title: 'Perfume Agregado con Éxito!',
                text: `${productName} ha sido añadido al carrito.`,
                timer: 3000, // 2 segundos
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                background: '#ff0000', // Fondo rojo personalizado
                color: '#ffffff', // Texto blanco
                customClass: {
                    title: 'swal-title-bold',
                    content: 'swal-text-bold'
                },
                timerProgressBar: true,
            });
        });
    });
});
//---------------------------------------------------------------------- index.js
// index.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado y analizado');
    // Inicializar el carrito (podemos utilizar localStorage para persistencia)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Seleccionar todos los botones de "Añadir al Carrito"
    const addToCartButtons = document.querySelectorAll('.button-add-to-cart');
    console.log(`Se encontraron ${addToCartButtons.length} botones de "Añadir al Carrito"`);
    // Seleccionar todos los botones "Ver Carrito"
    const viewCartButtons = document.querySelectorAll('.btn-view-cart');
    // Seleccionar el elemento para mostrar la cantidad de ítems en el carrito
    const cartQtyElements = document.querySelectorAll('.cart-qty');
    // Función para actualizar la cantidad de ítems en el carrito en todos los lugares
    function updateCartQty() {
        cartQtyElements.forEach(elem => {
            elem.textContent = cart.length;
        });
    }
    // Inicializar la cantidad de ítems en el carrito
    updateCartQty();
    // Verificar si se encontraron botones
    if (addToCartButtons.length === 0) {
        console.error('No se encontraron botones con la clase .button-add-to-cart');
        return;
    }
    // Añadir event listener a cada botón "Añadir al Carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Botón "Añadir al Carrito" clicado');
            // Obtener el elemento padre con la clase .product
            const product = this.closest('.product');
            if (!product) {
                console.error('Elemento .product no encontrado');
                return;
            }
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = product.getAttribute('data-price');
            const productImage = product.getAttribute('data-image');
            if (!productName) {
                console.error('Atributo data-name no encontrado en .product');
                return;
            }
            // Verificar si el producto ya está en el carrito
            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                Swal.fire({
                    icon: 'info',
                    title: 'Producto Ya Agregado',
                    text: `${productName} ya está en el carrito.`,
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end',
                    background: '#ffc107', // Fondo amarillo para información
                    color: '#000000',       // Texto negro
                    customClass: {
                        title: 'swal-title-bold',
                        content: 'swal-text-bold'
                    },
                    timerProgressBar: true,
                });
                return;
            }
            // Crear un objeto de producto
            const productObj = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            };
            // Agregar el producto al carrito
            cart.push(productObj);
            console.log(`Agregado al carrito: ${productName}`);
            // Actualizar la cantidad de ítems en el carrito
            updateCartQty();
            // Guardar el carrito en localStorage para persistencia
            localStorage.setItem('cart', JSON.stringify(cart));
            // Emitir la alerta con SweetAlert2 personalizada
            Swal.fire({
                icon: 'success',
                title: '¡Producto Agregado!',
                text: `${productName} ha sido añadido al carrito.`,
                timer: 2000, // 2 segundos
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                background: '#28a745', // Fondo verde personalizado
                color: '#ffffff',       // Texto blanco
                customClass: {
                    title: 'swal-title-bold',
                    content: 'swal-text-bold'
                },
                timerProgressBar: true,
            });
        });
    });
    // Función para mostrar el contenido del carrito
    function showCart() {
        if (cart.length === 0) {
            // Si el carrito está vacío, mostrar una alerta
            Swal.fire({
                icon: 'warning',
                title: 'Carrito Vacío',
                text: 'No tienes productos agregados al carrito.',
                timer: 2000,
                showConfirmButton: false,
                background: '#ffc107', // Fondo amarillo
                color: '#000000',       // Texto negro
                customClass: {
                    title: 'swal-title-bold',
                    content: 'swal-text-bold'
                },
                timerProgressBar: true,
            });
        } else {
            // Si el carrito tiene productos, mostrar una lista de los productos
            let cartHtml = '<ul style="list-style: none; padding: 0;">';
            cart.forEach((item, index) => {
                cartHtml += `
                    <li style="margin-bottom: 10px; display: flex; align-items: center;">
                        <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; object-fit: cover; margin-right: 10px; border-radius: 5px;">
                        <div>
                            <strong>${item.name}</strong><br>
                            Precio: $${item.price}
                        </div>
                    </li>
                `;
            });
            cartHtml += '</ul>';
            // Calcular el total
            const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
            cartHtml += `<p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
            Swal.fire({
                title: 'Tu Carrito',
                html: cartHtml,
                icon: 'info',
                showCloseButton: true,
                showConfirmButton: false,
                background: '#ffffff',
                color: '#000000',
            });
        }
    }
    // Añadir event listener a cada botón "Ver Carrito"
    if (viewCartButtons.length === 0) {
        console.error('No se encontraron botones con la clase .btn-view-cart');
    } else {
        viewCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log('Botón "Ver Carrito" clicado');
                showCart();
            });
        });
    }
});

// index.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado y analizado');
    // Inicializar el carrito (usando localStorage para persistencia)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Seleccionar todos los botones de "Añadir al Carrito"
    const addToCartButtons = document.querySelectorAll('.button-add-to-cart');
    console.log(`Se encontraron ${addToCartButtons.length} botones de "Añadir al Carrito"`);
    // Seleccionar todos los botones "Ver Carrito"
    const viewCartButtons = document.querySelectorAll('.button-view-cart');
    // Seleccionar el botón de cerrar en el menú del carrito
    const closeCartButton = document.querySelector('.btn-close');
    // Seleccionar todos los elementos para mostrar la cantidad de ítems en el carrito
    const cartQtyElements = document.querySelectorAll('.cart-qty');
    // Función para actualizar la cantidad de ítems en el carrito en todos los lugares
    function updateCartQty() {
        cartQtyElements.forEach(elem => {
            elem.textContent = cart.length;
        });
    }
    // Inicializar la cantidad de ítems en el carrito
    updateCartQty();
    // Verificar si se encontraron botones "Añadir al Carrito"
    if (addToCartButtons.length === 0) {
        console.error('No se encontraron botones con la clase .button-add-to-cart');
        return;
    }
    // Añadir event listener a cada botón "Añadir al Carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Botón "Añadir al Carrito" clicado');
            // Obtener el elemento padre con la clase .product
            const product = this.closest('.product');
            if (!product) {
                console.error('Elemento .product no encontrado');
                return;
            }
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = product.getAttribute('data-price');
            const productImage = product.getAttribute('data-image');
            if (!productName) {
                console.error('Atributo data-name no encontrado en .product');
                return;
            }
            // Verificar si el producto ya está en el carrito
            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                Swal.fire({
                    icon: 'info',
                    title: 'Producto Ya Agregado',
                    text: `${productName} ya está en el carrito.`,
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end',
                    background: '#ffc107', // Fondo amarillo para información
                    color: '#000000',       // Texto negro
                    customClass: {
                        title: 'swal-title-bold',
                        content: 'swal-text-bold'
                    },
                    timerProgressBar: true,
                });
                return;
            }
            // Crear un objeto de producto
            const productObj = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            };
            // Agregar el producto al carrito
            cart.push(productObj);
            console.log(`Agregado al carrito: ${productName}`);
            // Actualizar la cantidad de ítems en el carrito
            updateCartQty();
            // Guardar el carrito en localStorage para persistencia
            localStorage.setItem('cart', JSON.stringify(cart));
            // Emitir la alerta con SweetAlert2 personalizada
            Swal.fire({
                icon: 'success',
                title: '¡Producto Agregado!',
                text: `${productName} ha sido añadido al carrito.`,
                timer: 2000, // 2 segundos
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                background: '#28a745', // Fondo verde personalizado
                color: '#ffffff',       // Texto blanco
                customClass: {
                    title: 'swal-title-bold',
                    content: 'swal-text-bold'
                },
                timerProgressBar: true,
            });
        });
    });
    // Función para abrir el menú del carrito
    function openCartMenu() {
        const cartMenu = document.querySelector('.header-menu-add-to-card');
        if (cartMenu) {
            cartMenu.classList.remove('is-hidden');
        }
    }
    // Función para cerrar el menú del carrito
    function closeCartMenu() {
        const cartMenu = document.querySelector('.header-menu-add-to-card');
        if (cartMenu) {
            cartMenu.classList.add('is-hidden');
        }
    }
    // Añadir event listener a cada botón "Ver Carrito"
    if (viewCartButtons.length === 0) {
        console.error('No se encontraron botones con la clase .button-view-cart');
    } else {
        viewCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log('Botón "Ver Carrito" clicado');
                if (cart.length > 0) {
                    openCartMenu();
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Carrito Vacío',
                        text: 'No tienes productos agregados al carrito.',
                        timer: 2000,
                        showConfirmButton: false,
                        toast: true,
                        position: 'top-end',
                        background: '#ffc107', // Fondo amarillo
                        color: '#000000',       // Texto negro
                        customClass: {
                            title: 'swal-title-bold',
                            content: 'swal-text-bold'
                        },
                        timerProgressBar: true,
                    });
                }
            });
        });
    }
    // Añadir event listener al botón de cerrar en el menú del carrito
    if (closeCartButton) {
        closeCartButton.addEventListener('click', function() {
            closeCartMenu();
        });
    }
});
function openCartMenu() {
    const cartMenu = document.querySelector('.header-menu-add-to-card');
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartMenu && cartOverlay) {
        cartMenu.classList.remove('is-hidden');
        cartOverlay.classList.add('active');
    }
}
function closeCartMenu() {
    const cartMenu = document.querySelector('.header-menu-add-to-card');
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartMenu && cartOverlay) {
        cartMenu.classList.add('is-hidden');
        cartOverlay.classList.remove('active');
    }
}
// Añadir event listener al overlay para cerrar el carrito al hacer clic fuera
const cartOverlay = document.querySelector('.cart-overlay');
if (cartOverlay) {
    cartOverlay.addEventListener('click', function() {
        closeCartMenu();
    });
}
