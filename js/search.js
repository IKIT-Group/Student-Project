// const products = [
//     {
//         id: 0,
//         image: './../img/shop/food/product-1.png',
//         title: 'Сухой корм Edel Adult для взрослых стерелизованных кошек, 10 кг.',
//         price: 4842,
//     },
//     {
//         id: 1,
//         image: './../img/shop/food/product-2.png',
//         title: 'Сухой корм Edel Adult для взрослых стерелизованных кошек, 1.5 кг.',
//         price: 972,
//     },
//     {
//         id: 2,
//         image: './../img/shop/food/product-3.png',
//         title: 'Сухой корм Alpha Pet для щенков и беременных собак с ягненков, 7 кг.',
//         price: 4785,
//     },
//     {
//         id: 3,
//         image: './../img/shop/food/product-4.png',
//         title: 'Консервированный корм My Pets для собак с ягненком, 0.34 кг.',
//         price: 135,
//     },
//     {
//         id: 4,
//         image: './../img/shop/food/product-5.png',
//         title: 'Лакомство Оливер для собак шашлычки с мясом страуса, 0.75 кг.',
//         price: 2620,
//     },
//     {
//         id: 5,
//         image: './../img/shop/food/product-6.png',
//         title: 'Кошачья мята BLISS, 10 гр.',
//         price: 90,
//     },
// ]

// /** @param {string} query - Строка для поиска */
// const findProducts = query => products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));

// const searchBar = document.getElementById('searchBar');

// searchBar.addEventListener('keyup', e => {
//     const searchData = e.target.value.toLowerCase();
//     const filteredData = findProducts(searchData);
//     displayItem(filteredData)
// });

// const displayItem = (items) => {
//     const root = document.getElementById('root');
//     let result = "";
//     for(const item of items) {
//         const { id, image, title, price } = item;
//         result +=
//         `<div class='food-catalog__list'>
//             <div class='food-catalog__img-box'>
//                 <img class='food-catalog__images' src=${image}></img>
//             </div> 
//             <div class='food-catalog__bottom'>
//                 <p>${title}</p>
//                 <h2>${price}.00</h2>
//                 <button id="buy-${id}">Add to cart</button>
//             </div>
//         </div>`
//     }
//     root.innerHTML = result;
//     const button = document.getElementById(`buy-${id}`);
//     button.onclick = () => addToCart(id);
// };
// displayItem(products);

// // КОРЗИНА
// // всё хранится в Local Storage (памяти браузера)

// const getCart = () => JSON.parse(localStorage.getItem('cart'));
// const setCart = items => localStorage.setItem('cart', JSON.stringify(items));

// if (!getCart()) setCart({});

// /** @param {number} itemId - ID продукта для добавления */
// const addToCart = itemId => {
//     let items = getCart();
//     if (items[itemId]) items[itemId]++;
//     else items[itemId] = 1;
//     setCart(items);
// }

// /** @param {number} itemId - ID продукта для удаления */
// const removeFromCart = itemId => {
//     let items = getCart();
//     if (items[itemId] > 1) items[itemId]--;
//     else delete items[itemId];
//     setCart(items);
// }

let filterButton = document.querySelector('#toggle-filter');
let filterBlock = document.querySelector('.filter-row__block');

filterButton.onclick = function() {
    filterBlock.classList.toggle('visually-hidden');
}