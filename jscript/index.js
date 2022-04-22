//SHOW FILTERS ANIMATION
const filters = document.querySelector('.show-filter-txt')
const slide = document.querySelector('aside')
filters.addEventListener('click', () => {
    slide.classList.add('open-slide')
})