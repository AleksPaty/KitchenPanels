const headerMenu = document.getElementById('menu');
const sliderLine = document.getElementById('slider-line');

const btnBurger = document.getElementById('btn-burger-menu');


/* For burger menu */

const handleMenu = (event) => {
    if(event.target.nodeName === 'LI' || event.target.nodeName === 'A') {
        btnBurger.classList.remove('open');
        document.body.classList.remove('scroll-off');
        headerMenu.classList.remove('show-menu');
        headerMenu.removeEventListener('click', handleMenu);
    }
}
const handleBurgerBtn = () => {
    const newBtnClass = 'open';
    const newMenuClass = 'show-menu';
    const isOpen = btnBurger.classList.contains(newBtnClass);

    btnBurger.classList.toggle(newBtnClass);
    headerMenu.classList.toggle(newMenuClass);
    document.body.classList.toggle('scroll-off');

    !isOpen
        ? headerMenu.addEventListener('click', handleMenu)
        : headerMenu.removeEventListener('click', handleMenu);
}

btnBurger.addEventListener('click', handleBurgerBtn);


/* For Slider */

const slideDisplay = document.getElementById('slider-display');
const slideLine = document.getElementById('slider-line');
const card = document.querySelectorAll('.slider__display_review');
const btnSliderLeft = document.getElementById('btn-slider-left');
const btnSliderRight = document.getElementById('btn-slider-right');
const countReviews = slideLine.childElementCount;
const gapInSlideLine = 20;
let currentCount = 0;

const movingSlide = (direction, slideWidth) => {
    if(direction !== 'left' && direction !== 'right') return;

    const distance = slideWidth > 500 ? slideWidth / 2 : slideWidth + gapInSlideLine;
    direction === 'left'
        ? currentCount += 1
        : currentCount -= 1;

    slideLine.style.transform = `translateX(-${ distance * currentCount }px)`;
    console.log(distance * currentCount);
}

window.addEventListener('resize', () => {
    if(currentCount === 0) return;
    const width = document.documentElement.clientWidth;
    if(width < 1000 && width > 320) {
        setTimeout(() => {
            currentCount +=1;
            movingSlide('right', slideDisplay.offsetWidth);
        }, 500);
    }
});

btnSliderLeft.addEventListener('click', () => {
    const slideWindowWidth = slideDisplay.offsetWidth;
    if(slideWindowWidth > 500 && currentCount === countReviews / 2) return;
    if(slideWindowWidth <= 500 && currentCount === countReviews - 1) return;
    movingSlide('left', slideWindowWidth)
})

btnSliderRight.addEventListener('click', () => {
    const slideWindowWidth = slideDisplay.offsetWidth;
    if (currentCount === 0) return;
    movingSlide('right', slideWindowWidth);
})