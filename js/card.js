import { Pet, getPet, parseHealth, parseAge, parseImage } from './api.js';

const backButton = document.querySelector('.pet-card__link--back');
backButton.onclick = () => {
    const previousPage = document.referrer;
    if (!previousPage) location.href = '/';
    const url = new URL(previousPage);
    url.host === location.host ? history.back() : location.href = '/';
}

/*
Логика такая:
1. Получаем id питомца из URL (.../card.html?id=12345) => id = '12345'
2. Если id нет, отображаем сообщение "Питомец не найден"
3. Получаем питомца по id
4. Если питомец не найден, отображаем сообщение "Питомец не найден"
5. Выводим информацию о питомце
6. Добавляем ссылку на форму заявки с id питомца (.../form.html?id=12345)
*/

const params = new URLSearchParams(location.search);
const id = params.get('id');

const petImg = document.querySelector('.card-info__img');
const petName = document.querySelector('.card-info__name');
const petAge = document.querySelector('.card-info__age');
const petHealthTitle = document.querySelector('.card-info__health-title');
const petHealth = document.querySelector('.card-info__health-subtitle');
const petDescription = document.querySelector('.card-info__description');

const petSterilized = document.getElementById('petSterilized');
const petHasPassport = document.getElementById('petHasPassport');

const claimPet = document.querySelector('.pet-card__promo');
const formButton = document.querySelector('.button__to-form');

document.addEventListener("DOMContentLoaded", async () => {
    if (!id) {
        petName.textContent = "Питомец не найден";
        return;
    }
    const pet = await getPet(id);
    if (!pet) {
        petName.textContent = "Питомец не найден";
        return;
    }
    petImg.src = parseImage(pet.image);
    petName.textContent = pet.name;
    petAge.textContent = parseAge(pet.dateOfBirth);
    petHealthTitle.textContent = "Здоровье:";
    petHealth.textContent = parseHealth(pet.health);
    petDescription.textContent = pet.description;

    if (pet.sterilized) {
        petSterilized.classList.remove('visually-hidden');
        if (!pet.gender) petSterilized.textContent = "Cтерилизована";
    }
    if (pet.hasPassport) {
        petHasPassport.classList.remove('visually-hidden');
    }

    formButton.href = `./form.html?id=${pet.id}`;
    claimPet.classList.remove('visually-hidden');
});