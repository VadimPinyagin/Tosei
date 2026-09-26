//////////////////////////////////////////////////////////////////
// _theme-toggle

let theme = localStorage.getItem('color-theme') === 'dark' ? 'dark' : 'light';

document.documentElement.setAttribute('data-color-theme', theme);

document.querySelectorAll('.theme-toggle__radio').forEach((radio) => {
  // Покажем какой радио-баттон выбран исходя из того, что в localStorage
  if (radio.value === theme) {
    radio.checked = true;
  }

  radio.addEventListener('change', () => {
    theme = radio.value;
    document.documentElement.setAttribute('data-color-theme', theme);
    localStorage.setItem('color-theme', theme);

    // Передаем в метрику, где 00000 это id счетчика
    // ym(00000, 'params', {user_data: {color_theme: theme}});
  });

});

export {theme};

// end _theme-toggle
//////////////////////////////////////////////////////////////////
