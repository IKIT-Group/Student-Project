let dialogOpener = document.querySelector('.form__button');
let dialog = document.querySelector('.form__modal');
let inputForm = document.querySelectorAll('input')

dialogOpener.addEventListener("click", openModalAndLockScroll)
dialog.addEventListener("close", returnScroll)

function openModalAndLockScroll() {
  dialog.showModal()
  document.body.classList.add("scroll-lock")
}

function returnScroll() {
  document.body.classList.remove("scroll-lock")
}