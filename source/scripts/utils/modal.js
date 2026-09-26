//////////////////////////////////////////////////////////////////
// modal

const BUTTONS_SELECTORS = '[data-modal-id]';
const OPEN_MODAL_CLASS = 'modal--open';
const BODY_CLASS_WHEN_OPEN_MODAL = 'body-with-open-modal';

const wrapper = document.querySelector('.page');
let popup = document.querySelectorAll('.modal');

// чтобы закрывалось по крестику и по любой ссылке в модалке
const close = document.querySelectorAll('.btn--close');
const closeLink = document.querySelectorAll('.modal a');

const openModal = (targetModalId) => {
  popup = document.querySelector(`#${targetModalId}`);
  popup.classList.remove('hide');
  popup.classList.add(OPEN_MODAL_CLASS);
  document.body.classList.add(BODY_CLASS_WHEN_OPEN_MODAL);
};

// Общий обработчик на wrapper
wrapper.addEventListener('click', (event) => {
  const button = event.target.closest(BUTTONS_SELECTORS);

  // Если клик был не по кнопке или по кнопке вне wrapper — игнорируем
  if (!button || !wrapper.contains(button)) {
    return;
  }

  event.preventDefault();
  // Получаем id модалки из дата-атрибута кнопки
  const targetModalId = event.target.dataset.modalId;
  // Открыть модальное окно для этой кнопки
  openModal(targetModalId);
});

const closeModal = () => {
  // console.log(popup);
  popup.classList.add('hide');
  popup.classList.remove(OPEN_MODAL_CLASS);
  document.body.classList.remove(BODY_CLASS_WHEN_OPEN_MODAL);
};

// закрываем по крестику
if (close) {
  close.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      closeModal();
    });
  });
}

// Закрываем и переходим по ссылке (Например, пользовательские соглашения и т.д.)
if (closeLink) {
  closeLink.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      closeModal();
      window.location.href = event.target.getAttribute('href');
    });
  });
}

//закрываем окна по ESC
const isEscapeKey = (event) => event.key === 'Escape';
window.addEventListener('keydown', (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    if (popup.classList.contains(OPEN_MODAL_CLASS)) {
      closeModal();
    }
  }
});

//закрытие по клику мимо окна
// TODO надо бы переделать на клик по оверлею (или добавить его). А это тоже оставить, когда оверлей не оверлей, т.е. не на всё окно
if (popup) {
  popup.forEach((item) =>
    item.addEventListener('mouseup', (event) => {
      if (event.target.closest('.modal__body') === null) {
        closeModal();
      }
    })
  );
}


// end modal
//////////////////////////////////////////////////////////////////
