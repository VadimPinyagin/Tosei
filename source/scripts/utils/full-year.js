//////////////////////////////////////////////////////////////////
// full-year for copyright

const yearBlock = document.querySelector('[data-copyright]');
const startYearBlock = document.querySelector('[data-startYear]');
const startYear = startYearBlock.innerText;
const currentYear = new Date().getFullYear();
if (startYear < currentYear) {
  yearBlock.innerHTML = `© ${startYear} - ${currentYear}`;
} else {
  yearBlock.innerHTML = `© ${startYear}`;
}

// full-year for copyright
//////////////////////////////////////////////////////////////////
