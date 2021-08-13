
'use strict';
const html = document.documentElement;
const header = document.querySelector('.header');
const headerRow_1 = document.querySelector('.header__row_1');
const headerRow_2 = document.querySelector('.header__row_2');
const menu = document.querySelector('.header__menu');
const menuList = menu.querySelector('.menu');
const burger = document.querySelector('.header__burger');
const desktopBreakpoint = 768;

// burger button
burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    // fixHeaderHeight();
    menuList.classList.remove('show-sub-menu');
});

function addMenuArrow() {
    const menuArrow = '<button type="button" class="menu__arrow"></button>';
    menu.querySelectorAll('.menu-item-has-children').forEach(item => {
        item.insertAdjacentHTML('beforeend', menuArrow);
    });
}

function setIterationVar () {
    menu.querySelectorAll('.menu > li').forEach((item, i) => {
        item.style.setProperty('--i', i);
    });
}

function addButtonComeback () {
    const comebackButton = '<button type="button" class="menu__comeback">Назад</button>';
    document.querySelectorAll('.sub-menu').forEach(submenu => {
        submenu.insertAdjacentHTML('afterbegin', comebackButton);
    });
}

function setSubmenuPosition () {
    document.querySelectorAll('.sub-menu').forEach(submenu => {
        const menuListTop = menuList.offsetTop;
        const submenuTop = submenu.parentElement.offsetTop;
        const difference = submenuTop - menuListTop;
        submenu.style.top = `-${difference}px`;
    });
}

function resetSubmenuPosition () {
    document.querySelectorAll('.sub-menu').forEach(submenu => {
        submenu.style.top = '';
    });
}

function addEventToMenuArrow() {
    document.querySelectorAll('.menu__arrow').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            btn.closest('.menu-item-has-children').classList.toggle('open');
            // fixHeaderHeight();
            if( window.matchMedia('(max-width: 768px)').matches ) {
                menuList.classList.toggle('show-sub-menu');
            }
        }, true);
    });
}

function addEventToMenuItem() {
    menu.querySelectorAll('.menu-item-has-children').forEach(item => {
        item.addEventListener('click', e => {
            e.stopPropagation();
            item.classList.toggle('open');
            // fixHeaderHeight();
            if( (window.matchMedia('(max-width: 768px)').matches) ) {
                menuList.classList.toggle('show-sub-menu');
            }
        }, true);
    });
}

function closeAllSubmenu() {
    menu.querySelectorAll('.menu-item-has-children').forEach(item => {
        item.classList.remove('open');
    });
    menu.querySelector('.menu').classList.remove('show-sub-menu');
}

// disable opened mobile menu on desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > desktopBreakpoint) {
        burger.classList.remove('open');
        menu.classList.remove('open');
        // fixHeaderHeight();
        closeAllSubmenu();
        resetSubmenuPosition();
    } else {
        setSubmenuPosition();
    }
});

window.addEventListener('load', () => {
    addMenuArrow();
    addButtonComeback();
    addEventToMenuArrow();
    addEventToMenuItem();
    setIterationVar();
    if ( window.matchMedia('(max-width: 768px)').matches ) setSubmenuPosition();
});
// fixed header
// фиксим проваливание блока идущего после fixed header
function fixHeaderHeight() {
    header.nextElementSibling.style.paddingTop = `${header.offsetHeight}px`;
}

// при загрузке пересчитываем высоту header
window.addEventListener('load', fixHeaderHeight);

// при ресайзе пересчитываем высоту header
window.addEventListener('resize', fixHeaderHeight);

/**
 * when you scrolling page down - first part of header go to up
 * when you scrolling page up - first part of header come back down
 */
let prevScrollPosition = window.pageYOffset;
window.addEventListener('scroll', () => {
    const heightOfFirstPart = window.innerWidth > desktopBreakpoint ? headerRow_1.offsetHeight
        : document.querySelector('.header').offsetHeight;
    const currentScrollPosition = window.pageYOffset;
    if (prevScrollPosition > currentScrollPosition) {
        header.style.top = '0';
    } else if (currentScrollPosition > 400) {
        header.style.top = `-${heightOfFirstPart}px`;
    }
    prevScrollPosition = currentScrollPosition;
});

// is Apple
function isApple() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

window.addEventListener('load', () => {
    if (isApple()) document.querySelector('html').classList.add('ios');
});