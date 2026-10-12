const feedbackSwiper = () => {
  new Swiper('.feedback__slider', {
    loop: true,
    loopedSlides: 'auto',
    centeredSlides: false,
    loopAdditionalSlides: 1,
    slidesPerView: 1,
    width: 202,
    spaceBetween: 20,
  });
};

document.addEventListener('DOMContentLoaded', () => {
  feedbackSwiper();
});
