import { getProductsElementsByType } from './products.js';

/*
1. подгружаем все товары типа "еда" при загрузке
2. отображаем их
*/

document.addEventListener("DOMContentLoaded", async () => {
    const elements = await getProductsElementsByType('care');
    showProducts(elements);
});

const productsContainer = document.querySelector('.food-catalog__list');

/** @param {HTMLLIElement[]} data */
const showProducts = (data) => {
    productsContainer.innerHTML = '';
    for (const element of data) {
        productsContainer.appendChild(element);
    }
}