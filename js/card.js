import { Pet, getPets, parseAge, parseImage } from './api.js';

const params = new URLSearchParams(location.search);
const id = params.get('id');

const infoText = document.querySelector('.card-info__description');

if (!id) alert('А где айди?? АЛЛО!');

document.addEventListener("DOMContentLoaded", async () => {
    infoText.textContent = "АЙДИ: " + id;
});
