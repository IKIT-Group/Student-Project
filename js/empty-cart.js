import {
    Product,
    getCart,
    getProducts,
    getProductInCart,
    setProductInCart,
    ProductInCart,
    addToCart,
    removeFromCart,
    clearCart,
    parseImage,
    parsePrice,
    Order,
    makeOrder
} from './api.js';

const backButton = document.querySelector('.cart-header__link');
backButton.onclick = () => {
    const previousPage = document.referrer;
    if (!previousPage) location.href = '/';
    const url = new URL(previousPage);
    url.host === location.host ? history.back() : location.href = '/';
}

/** @type {Product[]} */
let allProducts;

document.addEventListener("DOMContentLoaded", async () => {
    allProducts = await getProducts();
    renderPage();
});

/** @returns {ProductInCart[]} */
const getProductsInCartWithAmount = () => {
    const productsInCart = getCart();
    return allProducts
        .filter(p => Object.keys(productsInCart).includes(p.id))
        .map(p => {
            return {
                ...p,
                amount: getProductInCart(p.id)
            }
        });
}

const nonEmptyCart = document.querySelector('.cart__grid');
const emptyCart = document.querySelector('.cart__info--empty');

const renderPage = () => {
    const productsInCart = getProductsInCartWithAmount();
    if (productsInCart.length > 0) {
        showProducts(productsInCart);
    } else {
        nonEmptyCart.classList.add('visually-hidden');
        emptyCart.classList.remove('visually-hidden');
    }
    showSummary(productsInCart);
}

const renderSummary = () => showSummary(getProductsInCartWithAmount());

const productsContainer = document.querySelector('.cart__grid-list');

/** @param {ProductInCart[]} data */
const showProducts = (data) => {
    while (productsContainer.firstChild) {
        productsContainer.removeChild(productsContainer.firstChild);
    }
    for (const product of data) {
        const productElement = document.createElement('li');
        productElement.classList.add('cart__grid-item');
        // IMAGE
        const productImage = new Image(124, 129);
        productImage.src = parseImage(product.image);
        productImage.alt = product.name;
        productImage.classList.add('cart__grid-img');
        productElement.appendChild(productImage);

        // NAME + QUANTITY
        const nameQuantityContainer = document.createElement('div');
        nameQuantityContainer.classList.add('cart__grid-wrapper--first');
        // Name
        const productName = document.createElement('p');
        const productNameText = document.createTextNode(product.name);
        productName.appendChild(productNameText);
        productName.classList.add('cart__grid-name');
        nameQuantityContainer.appendChild(productName);
        // Quantity
        const productQuantity = document.createElement('div');
        productQuantity.classList.add('cart__grid-quantity');
        // quantity title
        const productQuantityTitle = document.createElement('p');
        const productQuantityTitleText = document.createTextNode('Количество:');
        productQuantityTitle.appendChild(productQuantityTitleText);
        productQuantityTitle.classList.add('cart__grid-quantity__title');
        productQuantity.appendChild(productQuantityTitle);
        // quantity content
        const productQuantityContent = document.createElement('div');
        productQuantityContent.classList.add('quantity__wrapper');
        // - 1
        const productQuantityDecreaseButton = document.createElement('button');
        productQuantityDecreaseButton.classList.add('cart__grid-button--remove');
        productQuantityDecreaseButton.addEventListener('click', (e) => {
            e.preventDefault();
            removeFromCart(product.id);
            const newAmount = getProductInCart(product.id);
            if (newAmount === 0) {
                renderPage();
            } else {
                productQuantityContentValue.textContent = newAmount;
            }
            renderSummary();
        });
        const productQuantityDecreaseButtonImage = new Image(30, 30);
        productQuantityDecreaseButtonImage.src = '../img/cart/buttons/remove.svg';
        productQuantityDecreaseButton.appendChild(productQuantityDecreaseButtonImage);
        // amount
        const productQuantityContentValue = document.createElement('span');
        productQuantityContentValue.classList.add('cart__grid-quantity__value');
        const productQuantityContentValueText = document.createTextNode(product.amount);
        productQuantityContentValue.appendChild(productQuantityContentValueText);
        // + 1
        const productQuantityIncreaseButton = document.createElement('button');
        productQuantityIncreaseButton.classList.add('cart__grid-button--add');
        productQuantityIncreaseButton.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(product.id);
            const newAmount = getProductInCart(product.id);
            productQuantityContentValue.textContent = newAmount;
            renderSummary();
        });
        const productQuantityIncreaseButtonImage = new Image(30, 30);
        productQuantityIncreaseButtonImage.src = '../img/cart/buttons/add.svg';
        productQuantityIncreaseButton.appendChild(productQuantityIncreaseButtonImage);
        // add to wrapper
        productQuantityContent.appendChild(productQuantityDecreaseButton);
        productQuantityContent.appendChild(productQuantityContentValue);
        productQuantityContent.appendChild(productQuantityIncreaseButton);
        //
        productQuantity.appendChild(productQuantityContent);
        nameQuantityContainer.appendChild(productQuantity);
        //
        productElement.appendChild(nameQuantityContainer);
        // PRICE + REMOVE
        const priceRemoveWrapper = document.createElement('div');
        priceRemoveWrapper.classList.add('cart__grid-wrapper--second');
        // price
        const priceWapper = document.createElement('div');
        priceWapper.classList.add('cart__grid-price');
        // old price
        if (product.oldPrice) {
            const oldPrice = document.createElement('span');
            oldPrice.classList.add('cart__grid-price--old');
            const oldPriceText = document.createTextNode(parsePrice(product.oldPrice));
            oldPrice.appendChild(oldPriceText);
            priceWapper.appendChild(oldPrice);
        }
        // current price
        const currentPrice = document.createElement('p');
        currentPrice.classList.add('cart__grid-price--now');
        const currentPriceText = document.createTextNode(parsePrice(product.price));
        currentPrice.appendChild(currentPriceText);
        priceWapper.appendChild(currentPrice);
        priceRemoveWrapper.appendChild(priceWapper);
        // remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('cart__grid-button--delete');
        removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            setProductInCart(product.id, 0);
            renderPage();
        });
        // remove button image (svg)
        const removeButtonImage = new Image(30, 30);
        removeButtonImage.src = '../img/cart/buttons/delete.svg';

        removeButton.appendChild(removeButtonImage);
        removeButton.style.width = 
        priceRemoveWrapper.appendChild(removeButton);
        productElement.appendChild(priceRemoveWrapper);
        // finish!!!
        productsContainer.appendChild(productElement);
    }
}

const bookingButton = document.querySelector('.cart__grid-book');

const amountOfProducts = document.querySelector('.cart__info-value__title');
const totalPriceWithoutDiscount = document.querySelector('.cart__info-value__sum');
const totalDiscount = document.querySelector('.cart__info-sale__value');
const finalPrice = document.querySelector('.cart__grid-sum__value');

/** @param {ProductInCart[]} data */
const showSummary = (data) => {
    const amountOfProductsValue = data.reduce((acc, p) => acc + p.amount, 0);
    amountOfProducts.textContent = `Товары, ${amountOfProductsValue} шт.`;

    const totalPriceWithoutDiscountValue = data.reduce((acc, p) => acc + p.amount * (p.oldPrice || p.price), 0);
    totalPriceWithoutDiscount.textContent = parsePrice(totalPriceWithoutDiscountValue);

    const totalDiscountValue = data.reduce((acc, p) => acc + p.amount * ((p.oldPrice || p.price) - p.price), 0);
    totalDiscount.textContent = '- ' + parsePrice(totalDiscountValue);

    const finalPriceValue = totalPriceWithoutDiscountValue - totalDiscountValue;
    finalPrice.textContent = parsePrice(finalPriceValue);

    if (finalPriceValue > 0) {
        bookingButton.classList.remove('visually-hidden');
    } else {
        bookingButton.classList.add('visually-hidden');
    }
}

// КОНПКА БРОНИ

const orderButton = document.querySelector('.cart__grid-book__add');
const cartDialog = document.querySelector('.cart__modal');
const orderForm = document.getElementById('cartForm');

const openModalAndLockScroll = () => {
    cartDialog.showModal();
    document.body.classList.add("scroll-lock");
}

const returnScroll = () => {
    document.body.classList.remove("scroll-lock");
}

orderButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const formData = new FormData(orderForm);

    /** @type {Partial<Order>} */
    const o = { cart: getCart() };
    for (const [key, value] of formData) {
        if (!value) {
            alert('Введите e-mail!');
            return;
        }
        o[key] = value;
    };
    const order = new Order(o.email, o.cart);
    const gotOrder = await makeOrder(order);
    if (!gotOrder) {
        alert('Что-то пошло не так, возможно вы ввели неправильный e-mail');
        clearCart();
        return;
    }
    //... success!
    clearCart();
    renderPage();
    openModalAndLockScroll();
});

cartDialog.addEventListener("close", () => {
    returnScroll();
    location.href = '/';
});