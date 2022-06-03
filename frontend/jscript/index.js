//SHOW FILTERS ANIMATION
const filters = document.querySelector('.show-filter-txt');
const slide = document.querySelector('aside');
const filtersBtn = document.querySelector('.filter-btn');
const sortbyBtn = document.querySelector('.selected-sort');
const options = document.querySelector('.sort-wrap');
const closeOptions = document.querySelector('.title');

filters.addEventListener('click', () => {
    slide.classList.add('open-slide')
});

filtersBtn.addEventListener('click', () => {
    slide.classList.add('open-slide')
});

sortbyBtn.addEventListener('click', () => {
    options.classList.add('open-sort')
});

closeOptions.addEventListener('click', () => {
    options.classList.remove('open-sort')
});





