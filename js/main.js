/* Запрет писать цифры в input */
function noDigits(event) {
    if ("1234567890~`'[]{}|!@#$%^&*()_+№;%:?/\"=\\".indexOf(event.key) != -1)
      event.preventDefault();
    }

let tel = document.querySelector('[type=tel]');

let reg = /[A-Za-zА-Яа-яЁё]/g;
let reg1 = /[A-Za-z]/g;
let reg2 = /[e.]/g;

tel.oninput = function(){
    this.value = this.value.replace(reg, '')
}
fullname.oninput = function(){
    this.value = this.value.replace(reg1, '')
}
age.oninput = function(){
    this.value = this.value.replace(reg2, '');
    this.value = this.value.slice(0, 2);
}



