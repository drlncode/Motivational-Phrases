import { mobilePauseButtonContent, mobilePlayButtonContent } from './components/buttons.js';
import { getPhrases } from './services/getPhrases.js';

const changeLangBtn = document.querySelector('.translation');
const topauseButton = document.querySelector('.controls');
const processBar = document.querySelector('.process');
const showPhrase = document.querySelector('.text');

const URL = 'https://motivational-phrases-demo.vercel.app/phrases';
const { data: phrases } = await getPhrases({ url: URL });

let realPhrasesArrayIndexes = phrases.length - 1;
let actualPhrase = '';
let progressBarPorcent = 0;
let changeIsPending = false;
let progressBarIsPaused = false;
let seenPhrases = [];

// Generating the phrase index to show.
updatePhrase();

// Detecting the device to change the pause button type.
deviceButton();

// Setting de phrase lenguage.
if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'english');
}

// Here the magic happens, changing the current phrase and updating the process bar to change it.
window.addEventListener('load', () => {
    setTimeout(() => {
        nextPhrase();
        showPhrase.classList.add('show');

        setInterval(() => {
            if (!changeIsPending && !progressBarIsPaused) {
                progressBarPorcent++;
            }

            processBar.style.width = `${progressBarPorcent}%`;

            // I think it goes without saying that almost how this works depends on the progressBarPorcent variable.
            if (progressBarPorcent === 100) {
                showPhrase.classList.remove('show');
                progressBarPorcent = 0;
                changeIsPending = true;

                setTimeout(() => {
                    updatePhrase();
                    nextPhrase();
                    showPhrase.classList.add('show');
                    changeIsPending = false;
                }, 1000);
            }
        }, 50);
    }, 100);
});

// Event listener for mobile button.
topauseButton.addEventListener('click', deviceButton);

// Change the lang.
changeLangBtn.addEventListener('click', changeLang);

// Event listeners for pc "button".
document.addEventListener('keydown', (e) => {
    if (e.key === 's') {
        progressBarIsPaused = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 's') {
        progressBarIsPaused = false;
    }
});

// The ones that allow everything to happen, are nothing out of this world.
function changeLang() {
    if (localStorage.getItem('lang') === 'english') {
        localStorage.setItem('lang', 'spanish');
    } else {
        localStorage.setItem('lang', 'english');
    }

    nextPhrase();
}

function nextPhrase() {
    if (localStorage.getItem('lang') == 'english') {
        showPhrase.textContent = phrases[actualPhrase].pharase_english;
    } else {
        showPhrase.textContent = phrases[actualPhrase].pharase_spanish;
    }
}

/**
 * Small algorithm to generate a different phrase and make sure it is
 * not repeated unless all of them have already been generated.
 */
function updatePhrase() {
    if (seenPhrases.length === realPhrasesArrayIndexes) {
        seenPhrases = [];
    }

    let random;
    do {
        random = Math.floor(Math.random() * realPhrasesArrayIndexes);
    } while (seenPhrases.includes(random));

    seenPhrases.push(random);
    actualPhrase = random;

    // Old linear operation:
    //
    // if (actualPhrase == realPhrasesArrayIndexes) {
    //     actualPhrase = 0;
    //     return;
    // }
    //
    // actualPhrase++;
    //
}

function deviceButton(e) {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) {
        topauseButton.innerHTML = mobilePauseButtonContent;

        if (e) {
            if (topauseButton.classList.contains('progressBarIsPaused')) {
                progressBarIsPaused = false;
                topauseButton.classList.remove('progressBarIsPaused');
                topauseButton.innerHTML = mobilePauseButtonContent;
            } else {
                progressBarIsPaused = true;
                topauseButton.classList.add('progressBarIsPaused');
                topauseButton.innerHTML = mobilePlayButtonContent;
            }
        }
    }
}
