import { Pet, getPets, parseAge, parseImage } from './api.js';

const form = document.getElementById('pet-form');
const pets = document.getElementById('show-more__list');

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const params = new URLSearchParams();

    for (const [key, value] of formData)
        if (value !== '') params.append(key, value);
    
    const pets = await getPets(params);
    showPets(pets);
});

        // <li class="catalog__item" id="show-more__item">
        //     <img
        //         src="./../img/pet/catalog/card-img/card-img-1.png"
        //         alt="Кот Жорик"
        //         class="catalog__img"
        //         width="353px"
        //         height="274px"
        //     />
        //     <div class="catalog__description catalog-description">
        //         <p class="catalog-description__name">Жорик</p>
        //         <span class="catalog-description__age">2 года</span>
        //     </div>
        //     <p class="catalog__subtitle">
        //         Постоянно голодный, но мы как студенты его понимаем...
        //     </p>
        //     <a href="./card.html" class="catalog__link button button--link"
        //     >Подробнее</a>
        // </li>

/** @param {Pet[]} data */
const showPets = (data) => {
    while (pets.firstChild) {
        pets.removeChild(pets.firstChild);
    }
    for (const pet of data) {
        const petElement = document.createElement('li');
        petElement.classList.add('catalog__item');
        petElement.id = 'show-more__item';
        // IMAGE
        //     <img
        //         src="./../img/pet/catalog/card-img/card-img-1.png"
        //         alt="Кот Жорик"
        //         class="catalog__img"
        //         width="353px"
        //         height="274px"
        //     />
        const petImage = new Image(353, 275);
        petImage.src = parseImage(pet.image);
        petImage.alt = pet.name;
        petImage.classList.add('catalog__img');
        petElement.appendChild(petImage);
        // NAME + AGE <div>
        //     <div class="catalog__description catalog-description">
        //         <p class="catalog-description__name">Жорик</p>
        //         <span class="catalog-description__age">2 года</span>
        //     </div>
        const nameAgeContainer = document.createElement('div');
        nameAgeContainer.classList.add('catalog__description', 'catalog-description');

        const petName = document.createElement('p');
        const petNameText = document.createTextNode(pet.name);
        petName.appendChild(petNameText);
        petName.classList.add('catalog-description__name');
        nameAgeContainer.appendChild(petName);

        const petAge = document.createElement('span');
        const petAgeText = document.createTextNode(parseAge(pet.dateOfBirth));
        petAge.appendChild(petAgeText);
        petAge.classList.add('catalog-description__age');
        nameAgeContainer.appendChild(petAge);

        petElement.appendChild(nameAgeContainer);
        // SUBTITLE
        //     <p class="catalog__subtitle">
        //         Постоянно голодный, но мы как студенты его понимаем...
        //     </p>
        const petSubtitle = document.createElement('p');
        const petSubtitleText = document.createTextNode(pet.description);
        petSubtitle.appendChild(petSubtitleText);
        petSubtitle.classList.add('catalog__subtitle');
        petElement.appendChild(petSubtitle);
        // LINK
        //     <a href="./card.html" class="catalog__link button button--link"
        //     >Подробнее</a>
        const petLink = document.createElement('a');
        petLink.href = './card.html';
        petLink.classList.add('catalog__link', 'button', 'button--link');
        const petLinkText = document.createTextNode('Подробнее');
        petLink.appendChild(petLinkText);
        petElement.appendChild(petLink);
        // FINISH
        pets.appendChild(petElement);
    }
}