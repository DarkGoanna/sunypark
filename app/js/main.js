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

function setIterationVar() {
    menu.querySelectorAll('.menu > li').forEach((item, i, arr) => {
        item.style.setProperty('--in', i);
        item.style.setProperty('--out', ((arr.length - 1) - i));
    });
    menu.querySelectorAll('.sub-menu').forEach(submenu => {
        submenu.querySelectorAll('li').forEach((item, i, arr) => {
            item.style.setProperty('--sub_in', i);
            item.style.setProperty('--sub_out', ((arr.length - 1) - i));
        });
    });
}

function addButtonComeback() {
    const comebackButton = '<button type="button" class="menu__comeback">Назад</button>';
    document.querySelectorAll('.sub-menu').forEach(submenu => {
        submenu.insertAdjacentHTML('afterbegin', comebackButton);
    });
}

function setSubmenuPosition() {
    document.querySelectorAll('.sub-menu').forEach(submenu => {
        const menuListTop = menuList.offsetTop;
        const submenuTop = submenu.parentElement.offsetTop;
        const difference = submenuTop - menuListTop;
        submenu.style.top = `-${difference}px`;
    });
}

function resetSubmenuPosition() {
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
            if (window.matchMedia('(max-width: 768px)').matches) {
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
            if ((window.matchMedia('(max-width: 768px)').matches)) {
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
    if (window.matchMedia('(max-width: 768px)').matches) setSubmenuPosition();
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

// склонения
function declOfNum(n, titles) {
    return titles[n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

// write number in status field
function checkboxStatus(value, textOutClassName) {
    const statusText = document.querySelector(textOutClassName);
    const correctWord = declOfNum(value, ['элемент', 'элемента', 'элементов']);

    statusText.textContent = `${value} ${correctWord} выбрано`;

    let hasChecked = value ? true : false;
    statusText.setAttribute('data-hasChecked', hasChecked);
}


// add custom checkbox
function addCustomCheckbox(parent, checkboxClassName) {
    const checkboxes = document.querySelectorAll(`${parent} ${checkboxClassName}`);
    if (checkboxes.length) {
        let count = 0;

        checkboxes.forEach(checkbox => {
            checkbox.insertAdjacentHTML('beforeend', '<span class="custom-checkbox"></span>');
            const input = checkbox.querySelector('input[type="checkbox"]');
            input.addEventListener('change', function () {
                count = this.checked ? ++count : --count;
                checkboxStatus(count, `${parent} .cost-form__status-text`);
            });
        });
        checkboxStatus(count, `${parent} .cost-form__status-text`);
    }
}
addCustomCheckbox('.cost-form__health', '.cost-form__custom-checkbox');


// change radio
function initCustomRadio(parent, radioClassName) {
    const radios = document.querySelectorAll(`${parent} ${radioClassName}`);
    if (radios.length) {
        const output = document.querySelector(`${parent} .cost-form__status-text`);
        radios.forEach(radio => {
            const input = radio.querySelector('input[type="radio"]');
            input.addEventListener('change', function () {
                if (this.checked) {
                    output.textContent = input.value;
                    output.setAttribute('data-hasChecked', true);
                }
            });
        });
    }
}
initCustomRadio('.cost-form__city', '.cost-form__custom-checkbox');


// open/close checkbox menu
function openCustomSelect(parent) {
    const checkboxMenu = document.querySelector(`${parent} .cost-form__checkbox-wrapper`);
    const checkboxArrow = document.querySelector(`${parent} .cost-form__arrow`);
    document.addEventListener('click', event => {
        const { target } = event;

        if (target.classList.contains(`${parent} cost-form__checkbox-wrapper`)
            || target.closest(`${parent} .cost-form__checkbox-wrapper`)) {
            checkboxMenu.classList.add('open');
            checkboxArrow.classList.add('open');
        } else if (target.classList.contains(`${parent} cost-form__status`)
            || target.closest(`${parent} .cost-form__status`)) {
            checkboxMenu.classList.toggle('open');
            checkboxArrow.classList.toggle('open');
        } else {
            checkboxMenu.classList.remove('open');
            checkboxArrow.classList.remove('open');
        }
    });
}

// состояние зоровья
openCustomSelect('.cost-form__health');
// города
openCustomSelect('.cost-form__city');

// cost-form trigger
document.querySelector('.cost-form__trigger').addEventListener('click', function () {
    const form = this.closest('.cost-form');
    form.classList.toggle('open');
    this.classList.toggle('hidden');
});