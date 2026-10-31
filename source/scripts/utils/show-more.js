const initShowMore = () => {
  const showMoreBtn = document.querySelector('.trending__btn');
  const hiddenCards = document.querySelectorAll('.trending__item--hidden');

  if (showMoreBtn && hiddenCards.length > 0) {
    let openedCount = 0;

    showMoreBtn.addEventListener('click', () => {
      let currentShown = 0;

      hiddenCards.forEach((card) => {
        if (card.classList.contains('trending__item--hidden') && currentShown < 3) {
          card.classList.remove('trending__item--hidden');
          currentShown++;
          openedCount++;
        }
      });

      if (openedCount === hiddenCards.length) {
        showMoreBtn.remove();
      }
    });
  }
};

initShowMore();
