//////////////////////////////////////////////////////////////////
// toggle menu

const toggleMenu = () => {

  const toggle = document.querySelector('.btn-toggle');
  const nav = document.querySelector('.nav');

  if (toggle !== null) {
    document.querySelector('body').classList.remove('no-js');


    toggle.addEventListener('click', () => {
      nav.classList.toggle('nav--opened');
      toggle.classList.toggle('btn-toggle--close');
      document.querySelector('body').classList.toggle('body-with-open-modal');
    });
  }
};

toggleMenu();

// end toggle menu
//////////////////////////////////////////////////////////////////
const navMenu = document.querySelector('.nav');
const burgerOpenBtn = document.querySelector('.burger--lines');
const burgerCloseBtn = navMenu.querySelector('.burger--cross');

document.addEventListener('DOMContentLoaded', () => {

  const openMenu = () => {
    navMenu.classList.remove('is-hidden');
    void navMenu.offsetWidth;
    navMenu.classList.add('is-active');
  };

  const closeMenu = () => {
    navMenu.classList.remove('is-active');
    navMenu.classList.add('is-hidden');
  };

  burgerOpenBtn.addEventListener('click', openMenu);

  if (burgerCloseBtn) {
    burgerCloseBtn.addEventListener('click', closeMenu);
  }
  navMenu.addEventListener('click', (event) => {
    if (event.target === navMenu) {
      closeMenu();
    }
  });
});
