//////////////////////////////////////////////////////////////////
// to top
//const toTopBtn = document.querySelector('.to-top');

const toTopBtn = document.querySelector('.to-top');

function trackScroll() {
  let scrolled = window.scrollY;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    toTopBtn.classList.add('to-top--show');
  }
  if (scrolled < coords) {
    toTopBtn.classList.remove('to-top--show');
  }
}

// function backToTop() {
//   if (window.pageYOffset > 0) {
//     window.scrollBy(0, -80);
//     setTimeout(backToTop, 0);
//   }
// }

function strokeSize() {
  const fullHeight = document.documentElement.scrollHeight;
  const scrollHeight = window.scrollY + document.documentElement.clientHeight; // сколько проскроллили + вьюпорт
  const percent = scrollHeight / fullHeight * 100;
  if (toTopBtn) {
    toTopBtn.style.setProperty('--percent', percent);
  }
}


window.addEventListener('scroll', () => {
  trackScroll();
  strokeSize();
});

window.addEventListener('resize', () => {
  strokeSize();
});

//toTopBtn.addEventListener('click', backToTop);

//  to top
//////////////////////////////////////////////////////////////////
