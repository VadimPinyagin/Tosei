const switchesTabs = (elements, callback) => {
  elements.forEach(callback);
};

const initProductTabs = () => {
  const container = document.querySelector('.product-info');
  if (!container) return;

  const tabs = container.querySelectorAll('.product-info__tab');
  const panels = container.querySelectorAll('.product-info__content');

  let activeTab = container.querySelector('.product-info__tab.is-active') || tabs[0];

  tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab === activeTab) return;

    const isRight = tab.offsetLeft > activeTab.offsetLeft;

    tab.style.setProperty('--origin', isRight ? 'left' : 'right');
    activeTab.style.setProperty('--origin', isRight ? 'right' : 'left');

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

    activeTab = tab;

    tab.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });

    const targetPanel = container.querySelector(`#${targetId}`);
    if (targetPanel) {
      targetPanel.classList.add('is-active');
      targetPanel.removeAttribute('hidden');
    }
  });
});
};

initProductTabs();
