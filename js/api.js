const apiUrl = 'https://d5dr7r5i2n1rsjd50kif.apigw.yandexcloud.net';
const storageUrl = 'https://storage.yandexcloud.net/backend-bucket';
const petsUrl = apiUrl + '/pets';

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
 * Получить читаемую строку возраста питомца
 * @param {string} dateText - текст даты
 * @returns {string}
 */
export const parseAge = dateText => {
    const date = new Date(dateText);
    const now = new Date();
    const yearsDifference = now.getFullYear() - date.getFullYear();
    return `${yearsDifference} лет`;
}

/**
 * Получить ссылку на изображение питомца
 * @param {string} imageText - название файла изображения
 * @returns {string}
 */
export const parseImage = imageText => `${storageUrl}/${imageText}`;