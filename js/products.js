import {
    getProducts,
    parseImage,
    parsePrice,
    addToCart,
    getProductInCart
} from './api.js';

/**
 * @param {'food' | 'care' | 'accessory' | 'toy'} type
 * @param {string?} name
 */
const getProductsByTypeAndName = async (type, name) => {
    const params = new URLSearchParams();
    params.append('type', type);
    if (name) {
        params.append('name', name);
    }
    return await getProducts(params);
}

/**
 * @param {'food' | 'care' | 'accessory' | 'toy'} type
 * @param {string?} name
 */
export const getProductsElementsByTypeAndName = async (type, name) => {
    const data = await getProductsByTypeAndName(type, name);
    const result = [];
    for (const product of data) {
        // CREATE A NEW ELEMENT
        const productElement = document.createElement('li');
        productElement.classList.add('food-catalog__item');
        if (product.oldPrice) {
            productElement.classList.add('food-catalog__item--sale');
        } else {
            productElement.classList.add('food-catalog__item--normal');
        }
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
        const actualProductPriceText = document.createTextNode(parsePrice(product.price));
        actualProductPrice.appendChild(actualProductPriceText);
        actualProductPrice.classList.add('food-catalog__price');

        productPriceContainer.appendChild(actualProductPrice);

        // есть ли скидка?
        if (product.oldPrice) {
            const oldProductPrice = document.createElement('span');
            const oldProductPriceText = document.createTextNode(parsePrice(product.oldPrice));
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
            buyProductButton.innerHTML = 'Добавлено ' + getProductInCart(product.id);
        });
        const buyProductButtonText = document.createTextNode('В корзину');
        buyProductButton.appendChild(buyProductButtonText);
        buyProductButton.classList.add('button', 'button__add');

        buyProductButtonContainer.appendChild(buyProductButton);
        buyProductButtonContainer.classList.add('button__wrapper');

        productElement.appendChild(buyProductButtonContainer);

        // PUSH THE ELEMENT TO THE LIST
        result.push(productElement);
    }
    return result;
}