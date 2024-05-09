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

// добавить классы владельца и продукта
// и функции для их получения

/**
 * Получить всех питомцев, удовлетворяющих условиям фильтрации
 * @param {URLSearchParams} query - Параметры фильтрации
 * @returns {Promise<Pet[]>}
 */
export const getPets = async (query) => {
    try {
        const response = await fetch(petsUrl + '?' + query, {
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
 * @returns {Promise<Pet>}
 */
export const getPet = async (id) => {
    try {
        const response = await fetch(petsUrl + '/' + id, {
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
 * Получить читаемую строку здоровья питомца
 * @param {string} healthText - текст здоровья
 * @returns {string}
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
 * @returns {string}
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
 * @returns {string}
 */
export const parseImage = imageText => `${storageUrl}/${imageText}`;