import './utils/theme-toggle.js';
import './utils/toggle-menu.js';
import './utils/check-macos.js';
import './utils/modal.js';
import {FocusLock} from './utils/focus-lock.js';
import './utils/scroll-table.js';
import './utils/to-top.js';
import './utils/sticky-header.js';
import './utils/full-year.js';


window.addEventListener('DOMContentLoaded', () => {

  window.focusLock = new FocusLock();

  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {

  });
});
