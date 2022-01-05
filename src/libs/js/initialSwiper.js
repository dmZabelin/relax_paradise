// *Initialize Swiper

const slidersArr = document.querySelectorAll('.slider-secondary');

for(let slider of slidersArr) {
    let dataNumber = slider.getAttribute('data-class');
    slidersInit('.slider-main_' + dataNumber, '.slider-secondary_' + dataNumber, dataNumber);
}

function slidersInit(sliderOne, sliderTwo, dataNumber) {

    let sliderSecondary = new Swiper(sliderTwo, {
        grabCursor: true,
        observer: true,
        observeParents: true,
        observeSlideCildren: true,
        breakpoints: {
            320: {
                spaceBetween: 5,
                slidesPerView: 2,
                freeMode: true,
                watchSlidesProgress: true,
            },
            577: {
                slidesPerView: 3,
                freeMode: true,
                watchSlidesProgress: true,
            },
            768: {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
            }
        }
    });

    new Swiper(sliderOne, {
        navigation: {
            nextEl: '.arrow-next_' + dataNumber,
            prevEl: '.arrow-prev_' + dataNumber,
        },
        thumbs: {
            swiper: sliderSecondary,
        },
        effect: 'fade',
        grabCursor: true,
        observer: true,
        observeParents: true,
        observeSlideCildren: true,
        breakpoints: {
            320: {
                autoHeight: true,
            },
            1024: {
                autoHeight: false,
            },
        },
        speed:800,
    });
}