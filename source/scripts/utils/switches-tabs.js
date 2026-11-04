const container = document.querySelector('.product-info');
const tabs = container.querySelectorAll('.product-info__tab');
const panels = container.querySelectorAll('.product-info__content');

const switchesTabs = (elements, callback) => {
  elements.forEach(callback);
};

const initProductTabs = () => {
  if (!container) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('aria-controls');

      switchesTabs(tabs, t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      switchesTabs(panels, p => {
        p.classList.remove('is-active');
        p.setAttribute('hidden', '');
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      tab.removeAttribute('tabindex');

      const targetPanel = container.querySelector(`#${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('is-active');
        targetPanel.removeAttribute('hidden');
      }
    });
  });
};

initProductTabs();
