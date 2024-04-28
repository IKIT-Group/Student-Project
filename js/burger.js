let navHeader = document.querySelector('.page-header__nav');
let navToggler = document.querySelector('.page-header__toggler');

navHeader.classList.remove('page-header__nav--nojs');

navToggler.addEventListener('click', function () {
    if (navHeader.classList.contains('page-header__nav--closed')) {
      navHeader.classList.remove('page-header__nav--closed');
      navHeader.classList.add('page-header__nav--opened');
    } else {
      navHeader.classList.add('page-header__nav--closed');
      navHeader.classList.remove('page-header__nav--opened');
    }
  })