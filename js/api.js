const apiUrl = 'https://d5dr7r5i2n1rsjd50kif.apigw.yandexcloud.net';
const storageUrl = 'https://storage.yandexcloud.net/backend-bucket';
const petsUrl = apiUrl + '/pets';
const ownersUrl = apiUrl + '/owners';
const productsUrl = apiUrl + '/products';

/**
 * Класс питомца
 */
export class Pet {
    id;          // string;
    type;        // string;
    name;        // string;
    description; // string;
    image;       // string;
    gender;      // boolean;
    sterilized;  // boolean;
    hasPassport; // boolean;
    health;      // string;
    dateOfBirth; // string;
}

/**
 * Класс товара
 */
export class Product {
    id;       // string;
    type;     // string;
    name;     // string;
    image;    // string;
    price;    // number
    oldPrice; // number | null
}

/**
 * Товар в корзине (товар + количество)
 */
export class ProductInCart {
    id;
    type;
    name;
    image;
    price;
    oldPrice;
    amount;
}

/**
 * Класс владельца (для анкеты)
 */
export class Owner {
    id;          // string
    name;        // string
    age;         // number
    phone;       // string
    email;       // string
    activity;    // string
    petId;       // string
    livesAlone;  // string
    hadPets;     // string
    hasPets;     // string
    selfWalking; // boolean
    canPay;      // boolean
    constructor(
        name,
        age,
        phone,
        email,
        activity,
        petId,
        livesAlone,
        hadPets,
        hasPets,
        selfWalking,
        canPay
    ) {
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.activity = activity;
        this.petId = petId;
        this.livesAlone = livesAlone;
        this.hadPets = hadPets;
        this.hasPets = hasPets;
        this.selfWalking = selfWalking;
        this.canPay = canPay;
    }
}

/**
 * Получить всех питомцев, удовлетворяющих условиям фильтрации
 * @param {URLSearchParams} query - Параметры фильтрации
 */
export const getPets = async (query) => {
    try {
        const response = await fetch(petsUrl + '?' + query || '', {
            method: "GET",
            mode: "cors"
        });
    
        if (!response.ok) return console.error("Ошибка запроса!");
    
        /** @type {Pet[]} */
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка: ' + error);
    }
}

/**
 * Получить одного питомца по его идентификатору
 * @param {string} id - Уникальный идентификатор питомца
 */
export const getPet = async (id) => {
    try {
        const response = await fetch(petsUrl + '/' + id, {
            method: "GET",
            mode: "cors"
        });
    
        if (!response.ok) return console.error("Ошибка запроса!");
    
        /** @type {Pet} */
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка: ' + error);
    }
}

/**
 * Получить все товары, удовлетворяющие условиям фильтрации
 * @param {URLSearchParams} query - Параметры фильтрации
 */
export const getProducts = async (query) => {
    try {
        const response = await fetch(productsUrl + '?' + query || '', {
            method: "GET",
            mode: "cors"
        });
    
        if (!response.ok) return console.error("Ошибка запроса!");
    
        /** @type {Product[]} */
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка: ' + error);
    }
}

/**
 * Получить один товар по его идентификатору
 * @param {string} id - Уникальный идентификатор товара
 */
export const getProduct = async (id) => {
    try {
        const response = await fetch(petsUrl + '/' + id, {
            method: "GET",
            mode: "cors"
        });
    
        if (!response.ok) return console.error("Ошибка запроса!");
    
        /** @type {Product} */
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка: ' + error);
    }
}

/**
 * Отправить заявку на питомца
 * @param {Owner} owner
 */
export const requestPet = async (owner) => {
    try {
        const response = await fetch(ownersUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(owner)
        });
    
        if (!response.ok) return console.error("Ошибка запроса!");
    
        /** @type {Owner} */
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка: ' + error);
    }
}

/**
 * Получить читаемую строку здоровья питомца
 * @param {string} healthText - текст здоровья
 */
export const parseHealth = healthText => {
    if (healthText === 'great') return "Отличное";
    if (healthText === 'good') return "Хорошее";
    if (healthText === 'bad') return "Плохое";
    if (healthText === 'disabled') return "Инвалин";
    return "Неизвестно";
}

/**
 * Получить читаемую строку возраста питомца
 * @param {string} dateText - текст даты
 */
export const parseAge = dateText => {
    const date = new Date(dateText);
    const now = new Date();
    const yearsDifference = now.getFullYear() - date.getFullYear();
    if (yearsDifference > 0) {
        let yearsText = "лет";
        if (10 < yearsDifference  && yearsDifference < 20) {
            yearsText = "лет";
        }
        if (yearsDifference % 10 === 1) {
            yearsText = "год";
        }
        else if (yearsDifference % 10 >= 2 && yearsDifference % 10 <= 4) {
            yearsText = "года";
        }
        return `${yearsDifference} ${yearsText}`;
    } else {
        const monthsDifference = now.getMonth() - date.getMonth();
        let monthsText = "месяцев";
        if (10 < monthsDifference  && monthsDifference < 20) {
            monthsText = "месяцев";
        }
        if (monthsDifference % 10 === 1) {
            monthsText = "месяц";
        }
        else if (monthsDifference % 10 >= 2 && monthsDifference % 10 <= 4) {
            monthsText = "месяца";
        }
        return `${monthsDifference} ${monthsText}`;
    }
}

/**
 * Получить ссылку на изображение питомца
 * @param {string} imageText - название файла изображения
 */
export const parseImage = imageText => `${storageUrl}/${imageText}`;

/**
 * Получить читаемую строку цены товара
 * @param {number} price - цена
 */
export const parsePrice = price => {
    return price + ' руб.';
}

// КОРЗИНА
// всё хранится в Local Storage (памяти браузера)

/** @returns {{[string]:number}} { productId : amountInCart } */
export const getCart = () => JSON.parse(localStorage.getItem('cart')) || {};

/** @param {{[string]:number}} items */
const setCart = items => localStorage.setItem('cart', JSON.stringify(items));

/** @param {string} itemId @returns {number} */
export const getProductInCart = (itemId) => {
    return getCart()[itemId] || 0;
}

/** @param {string} itemId @param {number} amount */
export const setProductInCart = (itemId, amount) => {
    let items = getCart();
    if (amount < 1) {
        delete items[itemId];
    } else {
        items[itemId] = amount;
    }
    setCart(items);
}

/** @param {string} itemId - ID продукта для добавления */
export const addToCart = itemId => {
    setProductInCart(itemId, getProductInCart(itemId) + 1);
}

/** @param {string} itemId - ID продукта для удаления */
export const removeFromCart = itemId => {
    setProductInCart(itemId, getProductInCart(itemId) - 1);
}