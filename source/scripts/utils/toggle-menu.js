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
