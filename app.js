window.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-icon');
    const siteHeaderWrapper = document.querySelector('.site-header__wrapper');
    
    function menuButtonClick() {
        siteHeaderWrapper.classList.add('site-header__active');
    }
    
    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        menuButtonClick()
    })
    
    document.addEventListener('click', (event) => {
        if (!siteHeaderWrapper.contains(event.target)) {
            siteHeaderWrapper.classList.remove('site-header__active');
        }
    })
})