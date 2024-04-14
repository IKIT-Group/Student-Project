$(function () {
    $('.photo__slider').slick({
        centerMode: true,
        infinite: true,
        centerPadding: '0px',
        arrows: false,
        slidesToShow: 3,
        appendArrows: $('.photo__slider-arrows'),
    })
})