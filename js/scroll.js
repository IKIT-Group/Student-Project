let menu = document.querySelector(".page-header__nav");

$(".page-body__about #menuDropdownSecond .site-menu__item a").on("click", function (e){
    e.preventDefault();

    var id = $(this).attr('href'),

    top = $(id).offset().top;

    $('body, html').animate({scrollTop: top - 150}, 1000);
    menu.classList.remove("page-header__nav--opened")
    menu.classList.add("page-header__nav--closed");

})
$(".anchor__link").on("click", function (e){
    e.preventDefault();

    var id = $(this).attr('href'),

    top = $(id).offset().top;

    $('body, html').animate({scrollTop: top - 35}, 1000);

})