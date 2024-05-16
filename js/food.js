import { Product, getProducts, parseImage, addToCart } from './api.js';

/*
1. подгружаем все товары типа "еда" при загрузке
2. отображаем их
*/

const productsContainer = document.querySelector('.food-catalog__list');

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams();
    params.append('type', 'food');
    const foodProducts = await getProducts(params);
    showProducts(foodProducts);
});

/** @param {Product[]} data */
const showProducts = (data) => {
    while (productsContainer.firstChild) {
        productsContainer.removeChild(productsContainer.firstChild);
    }
    for (const product of data) {
        // CREATE A NEW ELEMENT
        const productElement = document.createElement('li');
        productElement.classList.add('food-catalog__item', 'food-catalog__item--normal');
        productElement.id = 'show-more__item';
        // IMAGE
        const productImage = new Image(353, 306);
        productImage.src = parseImage(product.image);
        productImage.alt = product.name;
        productImage.classList.add('food-catalog__img');

        productElement.appendChild(productImage);
        // NAME
        const productName = document.createElement('p');
        const productNameText = document.createTextNode(product.name);
        productName.appendChild(productNameText);
        productName.classList.add('food-catalog__name');

        productElement.appendChild(productName);
        // PRICE
        const productPriceContainer = document.createElement('div');

        const actualProductPrice = document.createElement('p');
        const actualProductPriceText = document.createTextNode(product.price);
        actualProductPrice.appendChild(actualProductPriceText);
        actualProductPrice.classList.add('food-catalog__price');

        productPriceContainer.appendChild(actualProductPrice);

        // есть ли скидка?
        if (product.oldPrice) {
            const oldProductPrice = document.createElement('span');
            const oldProductPriceText = document.createTextNode(product.oldPrice);
            oldProductPrice.appendChild(oldProductPriceText);
            oldProductPrice.classList.add('food-catalog__price--old');

            productPriceContainer.appendChild(oldProductPrice);
        }

        productPriceContainer.classList.add('food-catalog__price-row');

        productElement.appendChild(productPriceContainer);
        // BUTTON
        const buyProductButtonContainer = document.createElement('div');
        
        const buyProductButton = document.createElement('button');
        buyProductButton.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(product.id);
        });
        const buyProductButtonText = document.createTextNode('В корзину');
        buyProductButton.appendChild(buyProductButtonText);
        buyProductButton.classList.add('button', 'button__add');

        buyProductButtonContainer.appendChild(buyProductButton);

        productElement.appendChild(buyProductButtonContainer);

        // ATTACH THE ELEMENT TO CONTAINER
        productsContainer.appendChild(productElement);
    }
}