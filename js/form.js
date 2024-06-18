import { Owner, requestPet } from './api.js';

const petId = (new URLSearchParams(location.search)).get('id');
if (!petId) {
    alert('Выбран неправильный питомец!');
    window.location = './pet.html';
}

const submitFormButton = document.querySelector('.form__button');
const form = document.getElementById('form');

const dialog = document.querySelector('.form__modal');

const openModalAndLockScroll = () => {
    dialog.showModal();
    document.body.classList.add('scroll-lock');
}

const returnScroll = () => {
    document.body.classList.remove('scroll-lock');
}

dialog.addEventListener('close', () => returnScroll());

submitFormButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    /** @type {Partial<Owner>} */
    const o = { petId };
    for (const [key, value] of formData) {
        if (!value) {
            alert('Заполните данные полностью!');
            return;
        }
        o[key] = value;
    }
    const owner = new Owner(
        o.name,
        o.age,
        o.phone,
        o.email,
        o.activity,
        o.petId,
        o.livesAlone,
        o.hadPets,
        o.hasPets,
        o.selfWalking,
        o.canPay
    );
    const gotOwner = await requestPet(owner);
    if (!gotOwner) {
        alert('Что-то пошло не так, возможно вы уже отправляли заявку');
        return;
    }
    localStorage.setItem('orders', JSON.stringify([
        ...(JSON.parse(localStorage.getItem('orders')) || []),
        gotOwner.id
    ]));
    openModalAndLockScroll();
});
