import { Pet, getPet, parseHealth, parseAge, parseImage } from './api.js';

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
    }
    if (pet.hasPassport) {
        petHasPassport.classList.remove('visually-hidden');
    }

    formButton.href = `./form.html?id=${pet.id}`;
    claimPet.classList.remove('visually-hidden');
});