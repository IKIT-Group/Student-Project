const apiUrl = 'https://d5dr7r5i2n1rsjd50kif.apigw.yandexcloud.net';
const storageUrl = 'https://storage.yandexcloud.net/backend-bucket';
const petsUrl = apiUrl + '/pets';

const form = document.getElementById('pet-form');
const pets = document.getElementById('show-more__list');

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const params = new URLSearchParams();

    for (const [key, value] of formData)
        if (value !== '') params.append(key, value);
    
    await fetchPets(params);
});

const fetchPets = async (query) => {
    try {
        const response = await fetch(petsUrl + '?' + query, {
            method: "GET",
            mode: "cors"
        });
    
        if (!response.ok) return alert("Ошибка запроса!");
    
        /** @type {Pet[]} */
        const data = await response.json();
        console.log(data);
        showPets(data);
    } catch (error) {
        alert('Ошибка: ' + error);
    }
}

const parseAge = dateText => {
    const date = new Date(dateText);
    const now = new Date();
    const yearsDifference = now.getFullYear() - date.getFullYear();
    return `${yearsDifference} лет`;
}

const parseImage = imageText => `${storageUrl}/${imageText}`;

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

class Pet {
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