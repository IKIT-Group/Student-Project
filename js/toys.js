import { getProductsElementsByTypeAndName } from './products.js';

/*
1. подгружаем все товары типа "еда" при загрузке
2. отображаем их
*/

const inputField = document.querySelector('.food-catalog__search-button');

inputField.addEventListener('change', async () => {
    const productName = inputField.value
    const elements = await getProductsElementsByTypeAndName('toy', productName);
    showProducts(elements);
})

document.addEventListener('DOMContentLoaded', async () => {
    const elements = await getProductsElementsByTypeAndName('toy');
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