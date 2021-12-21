'use strict';
const html = document.documentElement;
const header = document.querySelector('.header');
const headerRow_1 = document.querySelector('.header__row_1');
const headerRow_2 = document.querySelector('.header__row_2');
const menu = document.querySelector('.header__menu');
const menuList = menu.querySelector('.menu');
const burger = document.querySelector('.header__burger');
const desktopBreakpoint = 768;
const API_KEY = 'AIzaSyDWQ9VHKbmvicDUzePMB9pRT9RxotohyQ0';

// фиксим проваливание блока идущего после fixed header
function fixHeaderHeight() {
    header.nextElementSibling.style.paddingTop = `${header.offsetHeight}px`;
}

// burger button
burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    html.classList.toggle('scrollOff')
    // fixHeaderHeight();
    closeAllSubmenu();
});

function addMenuArrow() {
    const menuArrow = '<button type="button" class="menu__arrow"></button>';
    menu.querySelectorAll('.menu-item-has-children > a').forEach(item => {
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
    document.querySelectorAll('.sub-menu').forEach(submenu => {
        const comebackButton = document.createElement('button');
        comebackButton.classList.add('menu__comeback');
        comebackButton.textContent = 'Назад';
        comebackButton.onclick = closeAllSubmenu;
        submenu.prepend(comebackButton)
    });
}

function setSubmenuPosition() {
    document.querySelectorAll('.sub-menu').forEach(submenu => {
        const submenuTop = submenu.parentElement.offsetTop;
        submenu.style.top = `-${submenuTop}px`;
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
            // fixHeaderHeight();
            if (window.matchMedia('(max-width: 768px)').matches) {
                btn.closest('.menu-item-has-children').classList.toggle('open');
<<<<<<< HEAD
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
            fixHeaderHeight();
            if ((window.matchMedia(`(max-width: ${desktopBreakpoint}px)`).matches)) {
=======
>>>>>>> 39ff2835faf7dc39b5e5d899472d5733a86fa7e6
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
        fixHeaderHeight();
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
    setIterationVar();
    if (window.matchMedia('(max-width: 768px)').matches) setSubmenuPosition();
});
<<<<<<< HEAD
=======

// fixed header
// фиксим проваливание блока идущего после fixed header
function fixHeaderHeight() {
    header.nextElementSibling.style.paddingTop = `${header.offsetHeight}px`;
}
>>>>>>> 39ff2835faf7dc39b5e5d899472d5733a86fa7e6

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

    const hasChecked = value ? true : false;
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

// open/close checkbox menu
function openCustomSelect(parent) {
    const checkboxMenu = document.querySelector(`${parent} .cost-form__checkbox-wrapper`);
    const checkboxArrow = document.querySelector(`${parent} .cost-form__arrow`);
    if (checkboxMenu) {
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
}

// состояние зоровья
openCustomSelect('.cost-form__health');

// cost-form trigger
const costFormTrigger = document.querySelector('.cost-form__trigger');
if (costFormTrigger) {
    costFormTrigger.addEventListener('click', function () {
        const form = this.closest('.cost-form');
        form.classList.toggle('open');
        this.classList.toggle('hidden');
    });
}

//calculate cost-form
const calcButton = document.querySelector('#cost-form__calculate');
if (calcButton) {
    calcButton.addEventListener('click', () => {
        const textarea = document.querySelector('#cost-form__data');
        const age = document.querySelector('#age');
        const gender = document.querySelector('input[name="gender"]:checked');
        const checkboxes = document.querySelectorAll('.cost-form__custom-checkbox input[name="health"]:checked');

        const ageResult = age.value ? age.value : null;
        const genderResult = gender ? gender.value : null;
        const checkboxesResult = [];

        if (checkboxes.length) {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxesResult.push(checkboxes[i].value);
            }
        }

        textarea.value = `Возраст пациента: ${ageResult}\nПол: ${genderResult}\nСостояние здоровья: ${checkboxesResult.join('\n')}`;
    });
}

const whatYouGetSvg = document.querySelector('.what-you-get__image svg path');
if (whatYouGetSvg) {
    const len = whatYouGetSvg.getTotalLength();
    whatYouGetSvg.style.WebkitTransition = 'none';
    whatYouGetSvg.style.strokeDasharray = len + ' ' + len;
    whatYouGetSvg.style.strokeDashoffset = len;
    whatYouGetSvg.getBoundingClientRect();
    whatYouGetSvg.style.transition = whatYouGetSvg.style.WebkitTransition = 'stroke-dashoffset 5s ease-in-out';
    whatYouGetSvg.style.strokeDashoffset = '0';
}

// team
const teamSlider = document.querySelector('.team__slider');
if (teamSlider) {
    new Swiper(teamSlider, {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
            el: '.team__slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.team__slider .swiper-button-next',
            prevEl: '.team__slider .swiper-button-prev',
        },
        breakpoints: {
            '0': {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            '580': {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            '768': {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            '1000': {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });
}

// routine
const routineSlider = document.querySelector('.routine__slider');
if (routineSlider) {
    const routineSlidesTitle = routineSlider.querySelectorAll('.routine__slide-title--text');

    new Swiper(routineSlider, {
        slidesPerView: 1,
        spaceBetween: 30,
        autoHeight: true,
        pagination: {
            el: '.routine__pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="${className}">${(index + 1)}<span class="routine__pagination--text">. ${routineSlidesTitle[index].textContent}</span></span>`;
            },
        },
        navigation: {
            nextEl: '.routine__next',
            prevEl: '.routine__prev',
        }
    });
}

// gallery sliders
const gallerySliderWrappers = document.querySelectorAll('.gallery__slider');
if (gallerySliderWrappers) {
    gallerySliderWrappers.forEach(wrapper => {
        const slider = wrapper.querySelector('.swiper');
        const prev = wrapper.querySelector('.gallery__prev');
        const next = wrapper.querySelector('.gallery__next');
        const pagination = wrapper.querySelector('.gallery__pagination');

        new Swiper(slider, {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
            pagination: {
                el: pagination,
                clickable: true,
            },
            breakpoints: {
                '0': {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                '580': {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                '768': {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                '1000': {
                    spaceBetween: 30,
                },
            },
        });
    });
}

// clock
const clockWrapper = document.querySelector('.relative-receive__inner');
if (clockWrapper) {
    function getAngle(event) {
        let x, y, boxCenterX, boxCenterY, radians, angle;
        // Helper to convert radians to degrees
        function radToDeg(radians) {
            return (radians * 180 / Math.PI);
        }
        // Calculate the center of the object
        boxCenterX = clockWrapper.offsetLeft + clockWrapper.offsetWidth / 2;
        boxCenterY = clockWrapper.offsetTop + clockWrapper.offsetHeight / 2;
        // Calulate the triangle dimensions
        x = event.pageX - boxCenterX;
        y = boxCenterY - event.pageY;
        // Find the angle in radians
        radians = Math.atan(y / x);

        // Correct the angle by quadrant
        if (event.pageX < boxCenterX && boxCenterY > event.pageY) radians += Math.PI;
        if (event.pageX < boxCenterX && boxCenterY < event.pageY) radians += Math.PI;
        if (event.pageX > boxCenterX && boxCenterY < event.pageY) radians += Math.PI * 2;
        // Convert the angles to degress without precision
        angle = radToDeg(radians).toFixed(0);

        return angle;
    }

    document.addEventListener('mousemove', e => {
        if ((window.matchMedia(`(min-width: ${desktopBreakpoint}px)`).matches)) {
            const angle = getAngle(e);
            const clockPart = document.querySelector('.relative-receive__magic-line');
            clockPart.style.transform = `rotate(-${angle}deg)`;
        }
    });
}

// btn "read more" in section seo
if (document.querySelector('.seo')) {
    const less = 'Свернуть';
    const more = 'Подробнее';
    const e = document.querySelector('.seo__text');
    const defaultHeight = e.offsetHeight;
    const minHeight = Number.parseInt(e.style.getPropertyValue('--height'));

    if (defaultHeight > minHeight) {
        e.parentElement.insertAdjacentHTML('beforeend', '<button type="button" class="seo__btn btn"></button>');
        const t = document.querySelector('.seo__btn');

        e.classList.add('less');
        t.textContent = more;

        t.addEventListener('click', () => {
            e.classList.toggle('less');
            if (e.classList.contains('less')) {
                t.textContent = more;
                e.style.maxHeight = `${minHeight}px`;
            } else {
                t.textContent = less;
                e.style.maxHeight = `${defaultHeight + 80}px`;
            }
        });
    }
}

// get video id from youtube link 
function getVideoID(e) {
    return e.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i)[1]
}

// video-reviews
const videoReviews = document.querySelector('.video-reviews');
if (videoReviews) {
    const videos = videoReviews.querySelectorAll('.video-reviews__video');
    if (videos.length) {
        videos.forEach(video => {
            const id = getVideoID(video.getAttribute('data-link'));
            fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`)
                .then(response => response.json())
                .then(json => {
                    const currentVideo = json.items[0].snippet;
                    let imageURL = `http://img.youtube.com/vi/${id}/mqdefault.jpg`;

                    video.insertAdjacentHTML('beforeend', `<div class="video-reviews__image">
                        <a href="https://www.youtube.com/embed/${id}" data-fancybox="video-reviews">
                            <img src="${imageURL}" alt="${currentVideo.title}">
                        </a>
                    </div>
                    <div class="video-reviews__name">${currentVideo.title}</div>`)
                })
        })
    }

    // Swiper only for mobile
    let swiper;
    let init = false;

    function swiperMode() {
        const mobile = window.matchMedia('(min-width: 0px) and (max-width: 580px)');
        const sliderInSidebar = document.querySelector('.video-reviews__slider');

        if (sliderInSidebar) {
            // Enable (for mobile)
            if (mobile.matches) {
                if (!init) {
                    init = true;
                    swiper = new Swiper(sliderInSidebar, {
                        slidesPerView: 1,
                        loop: true,
                        spaceBetween: 15,
                        autoHeight: true,
                        pagination: {
                            el: '.video-reviews__pagination',
                            clickable: true,
                        },
                    });
                }
            }
            else {
                if (swiper !== undefined) {
                    swiper.destroy();
                }
                init = false;
            }
        }
    }

    window.addEventListener('load', swiperMode);
    window.addEventListener('resize', swiperMode);
}

// fancubox global
Fancybox.defaults.hideScrollbar = false; 