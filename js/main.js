/* Запрет писать цифры в input */
function noDigits(event) {
    if ("1234567890~`'[]{}|!@#$%^&*()_+№;%:?/\"=\\".includes(event.key))
        event.preventDefault();
}

const tel = document.querySelector('[type=tel]');

const reg = /[A-Za-zА-Яа-яЁё]/g;
const reg1 = /[A-Za-z]/g;
const reg2 = /[e.]/g;

// а где fullname и age?
tel.oninput = function() {
    this.value = this.value.replace(reg, '')
}
fullname.oninput = function() {
    this.value = this.value.replace(reg1, '')
}
age.oninput = function() {
    this.value = this.value.replace(reg2, '').slice(0, 2);
}



