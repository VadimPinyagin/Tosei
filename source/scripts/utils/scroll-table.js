//////////////////////////////////////////////////////////////////
// scroll table

const scrollTable = () => {
  const tableToScroll = document.querySelectorAll('table');
  const pageBlock = document.querySelector('main');
  if (pageBlock) {
    const pageWidth = pageBlock.offsetWidth;

    tableToScroll.forEach((table) => {

      // Если нет обертки дивом с классом scroll-table, то обернём
      if (!table.parentElement.classList.contains('scroll-table')) {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'scroll-table');
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }

      const tableWidth = table.offsetWidth;
      if (tableWidth > pageWidth) {
        table.parentElement.classList.add('scroll-table--scroll');
      } else {
        table.parentElement.classList.remove('scroll-table--scroll');
      }
    });
  }
};

scrollTable();

window.addEventListener('resize', () => {
  scrollTable();
});


// end scroll table
//////////////////////////////////////////////////////////////////
