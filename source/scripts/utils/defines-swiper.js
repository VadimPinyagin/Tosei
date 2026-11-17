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

const initProductInfoSwiper = () => {
  const swiperEl = document.querySelector('.product-info__swiper-content');
  const tabsContainer = document.querySelector('.product-info__tabs');
  if (!swiperEl || !tabsContainer) return;

  const tabs = tabsContainer.querySelectorAll('[role="tab"]');

  // Двигаем красную полосу и меняем активный класс
  const syncTabs = (index) => {
    const activeTab = tabs[index];
    if (!activeTab) return;

    tabs.forEach((tab, i) => {
      tab.classList.toggle('is-active', i === index);
      tab.setAttribute('aria-selected', i === index);
    });

    tabsContainer.style.setProperty('--line-width', `${activeTab.offsetWidth}px`);
    tabsContainer.style.setProperty('--line-x', `${activeTab.offsetLeft}px`);

    activeTab.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    autoHeight: true,
    wrapperClass: 'product-info__swiper-wrapper',
    slideClass: 'product-info__content',
    on: {
      init: () => syncTabs(0),
      slideChange: (s) => syncTabs(s.activeIndex),
    },
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => swiper.slideTo(index));
  });
};


document.addEventListener('DOMContentLoaded', () => {
  initFeedbackSwiper();
  initProductSwiper ();
  initProductInfoSwiper();
});
