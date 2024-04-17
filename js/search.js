const products = [
    {
        id: 0,
        image: './../img/shop/food/product-1.png',
        title: 'Сухой корм Edel Adult для взрослых стерелизованных кошек, 10 кг.',
        price: 4842,
    },
    {
        id: 1,
        image: './../img/shop/food/product-2.png',
        title: 'Сухой корм Edel Adult для взрослых стерелизованных кошек, 1.5 кг.',
        price: 972,
    },
    {
        id: 2,
        image: './../img/shop/food/product-3.png',
        title: 'Сухой корм Alpha Pet для щенков и беременных собак с ягненков, 7 кг.',
        price: 4785,
    },
    {
        id: 3,
        image: './../img/shop/food/product-4.png',
        title: 'Консервированный корм My Pets для собак с ягненком, 0.34 кг.',
        price: 135,
    },
    {
        id: 4,
        image: './../img/shop/food/product-5.png',
        title: 'Лакомство Оливер для собак шашлычки с мясом страуса, 0.75 кг.',
        price: 2620,
    },
    {
        id: 5,
        image: './../img/shop/food/product-6.png',
        title: 'Кошачья мята BLISS, 10 гр.',
        price: 90,
    },
]

/** @param {string} query - Строка для поиска */
const findProducts = query => products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));

const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keyup', e => {
    const searchData = e.target.value.toLowerCase();
    const filteredData = findProducts(searchData);
    displayItem(filteredData)
});

const displayItem = (items) => {
    const root = document.getElementById('root');
    let result = "";
    for(const item of items) {
        const { image, title, price } = item;
        result +=
        `<div class='food-catalog__list'>
            <div class='food-catalog__img-box'>
                <img class='food-catalog__images' src=${image}></img>
            </div> 
            <div class='food-catalog__bottom'>
                <p>${title}</p>
                <h2>${price}.00</h2>
                <button>Add to cart</button>
            </div>
        </div>`
    }
    root.innerHTML = result;
};
displayItem(products);