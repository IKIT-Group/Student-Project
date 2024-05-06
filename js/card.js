import { Pet, getPet, parseAge, parseImage } from './api.js';

const params = new URLSearchParams(location.search);
const id = params.get('id');

const petImg = document.querySelector('.card-info__img');
const petName = document.querySelector('.card-info__name');
const petAge = document.querySelector('.card-info__age');
const petHealth = document.querySelector('.card-info__health-subtitle');

const addBlock = document.querySelector('.card-info__add');
const addBlockChildren = addBlock.querySelectorAll('.card-info__add--done');
const petSterilized = addBlockChildren[0];
const petHasPassport = addBlockChildren[1];

const petDescription = document.querySelector('.card-info__description');

if (!id) alert('А где айди?? АЛЛО!');

document.addEventListener("DOMContentLoaded", async () => {
    const pet = await getPet(id);
    petImg.src = parseImage(pet.image);
    petName.textContent = pet.name;
    petAge.textContent = parseAge(pet.dateOfBirth);
    petHealth.textContent = pet.health;
    petSterilized.textContent = pet.sterilized;
    petHasPassport.textContent = pet.hasPassport;
    petDescription.textContent = pet.description + `. А ЕГО АЙДИ = ${pet.id}`;
});