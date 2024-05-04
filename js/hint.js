let hintMessage = document.querySelector('#hintMessage');
let hintButton = document.querySelector('.cart__grid-book__hint');

hintButton.addEventListener('click', function() {
    if(hintMessage.classList.contains('visually-hidden')){
        hintMessage.classList.remove('visually-hidden');
    }
    else{
        hintMessage.classList.add('visually-hidden');
    }
})
window.addEventListener('click', function(e) {
    if(!e.target.closest('.cart__grid-book__hint')) {
        hintMessage.classList.add('visually-hidden');
    }
})