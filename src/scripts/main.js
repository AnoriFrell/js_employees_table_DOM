'use strict';

// write code here
const headerParams = document.querySelectorAll('thead th');
const table = document.querySelector('tbody');
const tableRows = table.querySelectorAll('tr');
let isAsc = true;
let lastSortedIndex = -1;

// TABLE SORTING BY CLICKING ON THE TITLE
headerParams.forEach((param) => {
  param.addEventListener('click', (ev) => {
    const targetIndex = [...headerParams].indexOf(ev.target);

    if (targetIndex !== lastSortedIndex) {
      isAsc = true;
      lastSortedIndex = targetIndex;
    }

    sortTable(ev, isAsc);
    isAsc = !isAsc;
  });
});

function sortTable(ev, asc) {
  const targetIndex = [...headerParams].indexOf(ev.target);

  const sortCells = [...tableRows].sort((a, b) => {
    const aText = a.children[targetIndex].innerText;
    const bText = b.children[targetIndex].innerText;

    const aNum = parseFloat(aText.replace(/[^0-9.-]+/g, ''));
    const bNum = parseFloat(bText.replace(/[^0-9.-]+/g, ''));

    if (isNaN(aNum) || isNaN(bNum)) {
      return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
    } else {
      return asc ? aNum - bNum : bNum - aNum;
    }
  });

  table.append(...sortCells);
}

// WHEN THE USER CLICKS ON A ROW, IT SHOULD BECOME SELECTED
tableRows.forEach((row) => {
  row.addEventListener('click', (ev) => {
    const prevSelected = table.querySelector('.active');
    // const selected = ev.target.closest('tr').querySelector('.active');

    if (prevSelected) {
      prevSelected.classList.remove('active');
    }

    ev.target.closest('tr').classList.toggle('active');
  });
});
