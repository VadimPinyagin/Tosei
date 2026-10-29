const nav = document.querySelector('.nav');
const btnOpen = document.querySelector('.burger--lines');
const btnClose = nav.querySelector('.burger--cross');
const navLinks = nav.querySelectorAll('.nav__link');
const openClass = 'is-active';

const closeNav = () => nav.classList.remove(openClass);

document.addEventListener('click', (e) => {
  const target = e.target;
  if (btnOpen.contains(target)) {
    nav.classList.add(openClass);
  }
  else if (btnClose.contains(target) || target === nav) {
    closeNav();
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

