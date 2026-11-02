import './utils/theme-toggle.js';
import './utils/defines-swiper.js';
import './utils/toggle-menu.js';
import './utils/check-macos.js';
import './utils/modal.js';
import './utils/toggle-nav.js';
import './utils/show-more.js';
import {FocusLock} from './utils/focus-lock.js';
import './utils/scroll-table.js';
import './utils/to-top.js';
import './utils/sticky-header.js';
import './utils/full-year.js';

// Функция инициализации данных товара
function initProductTransfer() {
  // 1. Слушаем клики по карточкам на главной или в каталоге
  const cardLinks = document.querySelectorAll('[data-title]');

  cardLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // Сохраняем имя машины в память перед переходом
      sessionStorage.setItem('currentProductTitle', link.dataset.title);
    });
  });

  // 2. На странице товара подставляем сохраненное имя в хлебные крошки
  const dynamicTitles = document.querySelectorAll('.js-product-title');
  const savedTitle = sessionStorage.getItem('currentProductTitle');

  if (savedTitle && dynamicTitles.length > 0) {
    dynamicTitles.forEach((element) => {
      element.textContent = savedTitle;
    });
  }
}

// Запускаем функцию (убедись, что этот код вызовется после загрузки DOM)
initProductTransfer();



window.addEventListener('DOMContentLoaded', () => {

  window.focusLock = new FocusLock();

  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {

  });
});
