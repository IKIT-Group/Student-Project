let cartDialogOpener = document.querySelector('.cart__grid-book__add');
let cartDialog = document.querySelector('.cart__modal');
let cartInputForm = document.querySelectorAll('input');




cartDialogOpener.addEventListener("click", openModalAndLockScroll);
cartDialog.addEventListener("close", returnScroll);
function openModalAndLockScroll() {
  cartDialog.showModal();
  document.body.classList.add("scroll-lock");
}

function returnScroll() {
  document.body.classList.remove("scroll-lock")
}


