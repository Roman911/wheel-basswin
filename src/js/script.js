import { useI18n } from './i18n.js';
import { useWheelAnimation } from './animation.js';

function fixedVh() {
    let isVisual = window.visualViewport || false;

    const changeVh = () => {
        let viewPort = isVisual
            ? window.visualViewport.height
            : window.innerHeight;
        let vh = viewPort * 0.01;

        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    changeVh();

    if (isVisual) {
        window.visualViewport.addEventListener('resize', () => {
            window.requestAnimationFrame(changeVh);
        });
    } else {
        window.addEventListener('resize', function () {
            window.requestAnimationFrame(changeVh);
        });
    }
}

$(document).ready(() => {
    const currencies = [''];
    const currentCurrency = currencies[0];

    const {
        locale,
        translation,
        applyTranslation
    } = useI18n();
    const {
        setupAnimation
    } = useWheelAnimation(translation, currentCurrency);

    applyTranslation();
    setupAnimation();

    const closeModal = () => {
        $('#final-modal').fadeOut()
        $('#stage-modal').fadeOut()
    };

    $('.modal__close').on('click', closeModal)
    $('.tryBtn').on('click', closeModal)

    $('#regBtn').on('click', function () {
        const link = "#";
        const sPageURL = window.location.search.substring(1);
        const mainLink = link + "&" + sPageURL;
        window.location.href = mainLink;
    });

    if (locale && ['es-BR', 'es-CL', 'es-PE'].includes(locale)) {
        if(window.screen.width <= 600) {
            $('.wheel__text').css('font-size', '10px');
        } else $('.wheel__text').css('font-size', '15px');
    }

    fixedVh();
})
