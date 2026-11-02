const dynamicTitles = document.querySelectorAll('.js-product-title');
const savedTitle = sessionStorage.getItem('currentProductTitle');

const initProductTransfer = () => {
  document.addEventListener('click', (e) => {
    const cardLink = e.target.closest('[data-title]');
    if (cardLink) {
      const title = cardLink.dataset.title;
      if (title) {
        sessionStorage.setItem('currentProductTitle', title);
      }
    }
  });

  if (savedTitle && dynamicTitles.length > 0) {
    dynamicTitles.forEach((el) => {
      el.textContent = savedTitle;
    });
  }
}

initProductTransfer();
