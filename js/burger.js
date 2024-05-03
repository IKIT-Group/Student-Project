let navHeader = document.querySelector('.page-header__nav');
let navToggler = document.querySelector('.page-header__toggler');
let pageHeader = document.querySelector('.page-header');

navHeader.classList.remove('page-header__nav--nojs');

navToggler.addEventListener('click', function () {
  if (navHeader.classList.contains('page-header__nav--closed')) {
    navHeader.classList.remove('page-header__nav--closed');
    navHeader.classList.add('page-header__nav--opened');
    pageHeader.style.borderRadius = '0px';
  } else {
    navHeader.classList.add('page-header__nav--closed');
    navHeader.classList.remove('page-header__nav--opened');
    pageHeader.style.borderRadius = '0px 0px 50px 50px';
  }
})

// let dropdownButtonFirst = document.getElementById('dropdownButton--first');
// let dropdownButtonSecond = document.getElementById('dropdownButton--first');
// console.log(dropdownButtonFirst);
// console.log(dropdownButtonSecond);

let dropdownButtonFirst = document.querySelector('#dropdownButton--first');
let dropdownMenuFirst = document.querySelector('#menuDropdownFirst');
let checkerFirst = false;

let dropdownButtonSecond = document.querySelector('#dropdownButton--second');
let dropdownMenuSecond = document.querySelector('#menuDropdownSecond');
let checkerSecond = false;


dropdownButtonFirst.addEventListener('click', function () {
  if (dropdownMenuFirst.classList.contains('visually-hidden')) {
    dropdownMenuFirst.classList.remove('visually-hidden');
    dropdownMenuFirst.style.display = "block";
    dropdownButtonFirst.style.transform = 'rotate(180deg)';
  }
  else {
    dropdownMenuFirst.classList.add('visually-hidden');
    dropdownMenuFirst.style.display = 'none';
    dropdownButtonFirst.style.transform = 'rotate(0deg)';
  }
})

dropdownButtonSecond.addEventListener('click', function () {
  if (dropdownMenuSecond.classList.contains('visually-hidden')) {
    dropdownMenuSecond.classList.remove('visually-hidden');
    dropdownMenuSecond.style.display = "block";
    dropdownButtonSecond.style.transform = 'rotate(180deg)';
  }
  else {
    dropdownMenuSecond.classList.add('visually-hidden');
    dropdownMenuSecond.style.display = 'none';
    dropdownButtonSecond.style.transform = 'rotate(0deg)';
  }
})


window.addEventListener('click', function (e) {
  if (!e.target.closest('#dropdownButton--first')) {
    dropdownMenuFirst.style.display = 'none';
    dropdownButtonFirst.style.transform = 'rotate(0deg)';
    dropdownMenuFirst.classList.add('visually-hidden');
  }
  
})

window.addEventListener('click', function (e){
  if (!e.target.closest('#dropdownButton--second')) {
    dropdownMenuSecond.style.display = 'none';
    dropdownButtonSecond.style.transform = 'rotate(0deg)';
    dropdownMenuSecond.classList.add('visually-hidden');
  }
})


