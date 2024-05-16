import {
    getCart,
    getProducts,
    getProductInCart,
    setProductInCart,
    ProductInCart,
    addToCart,
    removeFromCart,
    parseImage
} from './api.js';

const productsContainer = document.querySelector('.cart__grid-list');
const totalProducts = document.querySelector('.cart__grid-total');
let allProducts;

document.addEventListener("DOMContentLoaded", async () => {
    allProducts = await getProducts();
    renderPage();
});

const renderPage = () => {
    const productsInCart = getCart();

    /** @type {ProductInCart[]} */
    const filteredProducts = allProducts
        .filter(p => Object.keys(productsInCart).includes(p.id))
        .map(p => {
            return {
                ...p,
                amount: getProductInCart(p.id)
            }
        });
    
    showProducts(filteredProducts);
}

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
        // + 1
        const productQuantityDecreaseButton = document.createElement('button');
        productQuantityDecreaseButton.classList.add('cart__grid-button--remove');
        productQuantityDecreaseButton.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(product.id);
            renderPage();
        });
        // amount
        const productQuantityContentValue = document.createElement('span');
        productQuantityContentValue.classList.add('cart__grid-quantity__value');
        const productQuantityContentValueText = document.createTextNode(product.amount);
        productQuantityContentValue.appendChild(productQuantityContentValueText);
        // - 1
        const productQuantityIncreaseButton = document.createElement('button');
        productQuantityIncreaseButton.classList.add('cart__grid-button--add');
        productQuantityIncreaseButton.addEventListener('click', (e) => {
            e.preventDefault();
            removeFromCart(product.id);
            renderPage();
        });
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
            const oldPriceText = document.createTextNode(product.oldPrice);
            oldPrice.appendChild(oldPriceText);
            priceWapper.appendChild(oldPrice);
        }
        // current price
        const currentPrice = document.createElement('p');
        currentPrice.classList.add('cart__grid-price--now');
        const currentPriceText = document.createTextNode(product.price);
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
        priceRemoveWrapper.appendChild(removeButton);
        productElement.appendChild(priceRemoveWrapper);
        // finish!!!
        productsContainer.appendChild(productElement);
    }
}