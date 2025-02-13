window.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-icon');
    const siteHeaderWrapper = document.querySelector('.site-header__wrapper');
    const accordions = document.querySelectorAll('.accordion');
    const accordionHeads = document.querySelectorAll('.accordion__head');
    const accordionBodies = document.querySelectorAll('.accordion__body');
    const accordionBadges = document.querySelectorAll('.accordion__badge');
    const sitenavList = document.querySelector('.sitenav__list');
    const siteHeader = document.querySelector('.site-header');
    const mainContent = document.querySelector('.main-content');
    
    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        siteHeaderWrapper.classList.add('site-header__active');
    });
    
    document.addEventListener('click', (event) => {
        if (!siteHeaderWrapper.contains(event.target)) {
            siteHeaderWrapper.classList.remove('site-header__active');
        }
    });
    
    // ACCORDION
    accordionHeads.forEach((item, index) => {
        item.addEventListener('click', () => {
            const isActive = accordionBodies[index].classList.contains('accordion-active');
            
            accordions.forEach(acc => acc.classList.remove('change-bg'));
            accordionBodies.forEach(body => {
                body.classList.remove('accordion-active');
                body.style.maxHeight = null;
            });
            accordionBadges.forEach(badge => badge.classList.remove('change-badge'));
            
            if (!isActive) {
                accordionBodies[index].classList.add('accordion-active');
                accordionBodies[index].style.maxHeight = `${accordionBodies[index].scrollHeight}px`;
                accordionBadges[index].classList.add('change-badge');
                accordions[index].classList.add('change-bg');
            }
        });
    });
    
    // SCROLL
    window.onscroll = function() {
        if (window.innerWidth > 1001) {
            const offset = sitenavList.offsetHeight;
            if (window.scrollY > offset - 20) {
                sitenavList.classList.add('sitenav-bg');
            } else if (window.scrollY < offset - 20) {
                sitenavList.classList.remove('sitenav-bg');
            }
        }
    }
    
    //MAIN CONTENT'S MARGIN-TOP
    if ( window.innerWidth <= 1050) {
        function updateMainContentMargin() {
            const headerHeight = siteHeader.offsetHeight;
            mainContent.style.marginTop = `${headerHeight}px`;
        }
    }
    
    updateMainContentMargin();
    new ResizeObserver(updateMainContentMargin).observe(elHeader);
});
