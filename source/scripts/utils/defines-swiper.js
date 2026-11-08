const initFeedbackSwiper = () => {
  new Swiper('.feedback__slider', {
    loop: true,
    loopedSlides: 'auto',
    centeredSlides: false,
    loopAdditionalSlides: 1,
    slidesPerView: 1,
    width: 202,
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    resizeObserver: true,
  });
};

const initProductSwiper = () => {
  new Swiper('.product-info__gallery', {
    loop: true,
    loopedSlides: 'auto',
    loopAdditionalSlides: 1,
    centeredSlides: false,
    slidesPerView: 1,
    width: 300,
    spaceBetween: 8,
    wrapperClass: 'product-info__wrapper',
    slideClass: 'product-info__slide',
  });
};


document.addEventListener('DOMContentLoaded', () => {
  initFeedbackSwiper();
  initProductSwiper ();
});
