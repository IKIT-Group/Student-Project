$(function () {
    $('.photo__slider').slick({
        centerMode: true,
        infinite: true,
        arrows: true,
        slidesToShow: 3,
        variableWidth: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                }
            }
        ]
    })
})