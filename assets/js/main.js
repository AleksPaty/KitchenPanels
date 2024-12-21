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
const btnSliderLeft = document.getElementById('btn-slider-left');
const btnSliderRight = document.getElementById('btn-slider-right');
const countReviews = slideLine.childElementCount;
const gapInSlideLine = 20;
let currentCount = 0;

const checkOpportunityMoveSlide = (side, slideWidth) => {        // check moving slide or not
    let canMove = true;
    switch (side) {
        case 'left':
            if(slideWidth > 500 && currentCount === countReviews / 2) canMove = false;
            if(slideWidth <= 500 && currentCount === countReviews - 1) canMove = false;
            break;
        case 'right':
            if (currentCount === 0) canMove = false;
            break;
        default:
            break;
    }
    return canMove;
};

const movingSlide = (direction, slideWidth) => {
    if(direction !== 'left' && direction !== 'right') return;

    const distance = slideWidth > 500 ? slideWidth / 2 : slideWidth + gapInSlideLine;
    direction === 'left'
        ? currentCount += 1
        : currentCount -= 1;

    slideLine.style.transform = `translateX(-${ distance * currentCount }px)`;
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
    if(!checkOpportunityMoveSlide('left', slideWindowWidth)) return;

    movingSlide('left', slideWindowWidth);
})

btnSliderRight.addEventListener('click', () => {
    const slideWindowWidth = slideDisplay.offsetWidth;
    if (!checkOpportunityMoveSlide('right', slideWindowWidth)) return;

    movingSlide('right', slideWindowWidth);
})

slideDisplay.addEventListener('touchstart', (e) => {
    if(document.body.clientWidth > 768) return;

    const startPoint = e.touches[0].clientX;
    const touchMoving = function(touchPoint) {
        const touchEnd = (e) => {
            const startPoint = touchPoint;
            const endPoint = e.changedTouches[0].clientX;
            const slideWindowWidth = slideDisplay.offsetWidth;
            const side = startPoint - endPoint > 0 ? 'left' : 'right';

            if(checkOpportunityMoveSlide(side, slideWindowWidth)) movingSlide(side, slideWindowWidth);
            slideDisplay.removeEventListener('touchend', touchEnd);
        }
        return touchEnd;
    }

    slideDisplay.addEventListener('touchend', touchMoving(startPoint))
})
