// добавляем кнопки раскрытия подменю
const menuItemWithSubmenu = document.querySelectorAll('.menu-item-has-children');
menuItemWithSubmenu.forEach(item => {
    if (item.lastElementChild.className !== 'menu__arrow') {
        item.insertAdjacentHTML('beforeend', '<span class="menu__arrow"></span>');
    }
});


// открытие подменю
function openSubmenu(event) {
    if (event.target.className === 'menu__arrow') {
        event.target.parentElement.classList.toggle('active');
    }
}

// меню
const burger = document.querySelector('.header__burger');
burger.addEventListener('click', () => {
    document.querySelector('html').classList.toggle('scrollOff');
    burger.classList.toggle('open');

    // открываем/закрываем меню
    burger.closest('.header__nav').classList.toggle('open');

    const menuOpen = document.querySelector('.header__nav.open');
    const menu = document.querySelector('.header__nav');

    if (menuOpen) {
    // при открытии/закрытии закрыть все подменю
        const allActiveItems = menuOpen.querySelectorAll('.active');
        for (let i = 0; i < allActiveItems.length; i++) {
            allActiveItems[i].classList.remove('active');
        }
        // добавить событие открытия меню
        menuOpen.addEventListener('click', openSubmenu);
    } else {
    // убрать событие если закрыто
        menu.removeEventListener('click', openSubmenu);
    }

});

// fixed header
const header = document.querySelector('.header');

// фиксим проваливание блока идущего после fixed header
function fixHeaderHeight() {
    header.nextElementSibling.style.paddingTop = `${header.clientHeight}px`;
}

// при загрузке пересчитываем высоту header
window.addEventListener('load', fixHeaderHeight);

// при скролле
const lengthY = 50;
document.addEventListener('scroll', () => {
    fixHeaderHeight();
    if (window.scrollY > lengthY) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});

// при ресайзе пересчитываем высоту header
window.addEventListener('resize', fixHeaderHeight);

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