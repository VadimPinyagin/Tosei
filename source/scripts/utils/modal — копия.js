//////////////////////////////////////////////////////////////////
// modal

const buttons = document.querySelectorAll('[data-modal]');
let popup = document.querySelectorAll('.modal');

// чтобы закрывалось по крестику и по любой ссылке в модалке
const close = document.querySelectorAll('.btn--close');
const closeLink = document.querySelectorAll('.modal a');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    const modalId = `#${buttons[i].getAttribute('data-modal')}`;
    popup = document.querySelector(modalId);
    popup.classList.remove('hide');
    popup.classList.add('modal-open');
    document.querySelector('body').classList.add('body-with-open-modal');
  });
}

const closepopup = () => {
  // console.log(popup);
  popup.classList.add('hide');
  popup.classList.remove('modal--open');
  document.querySelector('body').classList.remove('body-with-open-modal');
};

// закрываем по крестику
if (close) {
  close.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      closepopup();
    });
  });
}

// закрываем и переходим по ссылке
if (closeLink) {
  closeLink.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      closepopup();
      window.location.href = evt.target.getAttribute('href');
    });
  });
}


//закрываем окна по ESC
const isEscapeKey = (evt) => evt.key === 'Escape';
window.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (popup.classList.contains('modal--open')) {
      closepopup();
    }
  }
});

//закрытие по клику мимо окна
if (popup) {

  popup.forEach((item) =>
    item.addEventListener('mouseup', (evt) => {
      if (evt.target.closest('.modal') === null) {
        closepopup();
      }
    })
  );
}


// end modal
//////////////////////////////////////////////////////////////////
