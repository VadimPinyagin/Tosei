//////////////////////////////////////////////////////////////////
// sticky-header

const stickyHeader = () => {

  const header = document.querySelector('.header');
  let headerHeight;
  let scrollDistance;
  let lastScrollTop = 50;

  const getHeaderHeight = () => {
    headerHeight = header.offsetHeight;
    document.body.style.setProperty('--header-height', `${headerHeight}px`)
  }

  getHeaderHeight();

  window.addEventListener('resize', () => {
    getHeaderHeight();
  });

  window.addEventListener('scroll', () => {

    scrollDistance = window.scrollY;
    if (scrollDistance > lastScrollTop) {
      header.classList.add('header--fixed');
    } else {
      header.classList.remove('header--fixed');
    }

    if (scrollDistance === 0) {
      header.classList.remove('header--fixed');
    }

    //lastScrollTop = scrollDistance; // так если нужно только при прокрутке в одну сторону
  });
}

stickyHeader();


// sticky-header
//////////////////////////////////////////////////////////////////
