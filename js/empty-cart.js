import { getCart, getProducts, getProductInCart, ProductInCart } from './api.js';

const productsContainer = document.querySelector('.cart__grid-list');

document.addEventListener("DOMContentLoaded", async () => {
    const allProducts = await getProducts();
    const productsInCart = getCart();

    /** @type {ProductInCart[]} */
    const filteredProducts = allProducts
        .filter(p => Object.keys(productsInCart).includes(p.id))
        .map(p => {
            return {
                ...p,
                amount: getProductInCart(p.id)
            }
        })
    
    console.log(filteredProducts);
    showProducts(filteredProducts);
});

/** @param {ProductInCart[]} data */
const showProducts = (data) => {
    while (productsContainer.firstChild) {
        productsContainer.removeChild(productsContainer.firstChild);
    }
    for (const product of data) {
        const element = document.createElement('p');
        const elementText = document.createTextNode(`${product.name} = ${product.amount}`);
        element.appendChild(elementText);

        productsContainer.appendChild(element);
    }
}