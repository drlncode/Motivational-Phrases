import { mobilePauseButtonContent, mobilePlayButtonContent } from '../components/buttonContents.js';
import constants from '../definitions/constants.js';
import variables from '../definitions/variables.js';

export function setLang() {
    if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'english');
    }
}

export function changePhraseAndManageProgressBar() {
    nextPhrase();
    constants.showPhrase.classList.add('show');

    setInterval(() => {
        if (!variables.changeIsPending && !variables.progressBarIsPaused) {
            variables.progressBarPorcent++;
        }

        constants.processBar.style.width = `${variables.progressBarPorcent}%`;

        // I think it goes without saying that almost how this works depends on the variables.progressBarPorcent variable.
        if (variables.progressBarPorcent === 100) {
            constants.showPhrase.classList.remove('show');
            variables.progressBarPorcent = 0;
            variables.changeIsPending = true;

            setTimeout(() => {
                updatePhrase();
                nextPhrase();
                constants.showPhrase.classList.add('show');
                variables.changeIsPending = false;
            }, 1000);
        }
    }, 50);
}

export function setPlay(e) {
    if (e.key === 's') variables.progressBarIsPaused = false;
}

export function setPause(e) {
    if (e.key === 's') variables.progressBarIsPaused = true;
}

// The ones that allow everything to happen, are nothing out of this world.
export function changeLang() {
    if (localStorage.getItem('lang') === 'english') {
        localStorage.setItem('lang', 'spanish');
    } else {
        localStorage.setItem('lang', 'english');
    }

    nextPhrase();
}

export function nextPhrase() {
    if (localStorage.getItem('lang') == 'english') {
        constants.showPhrase.textContent = constants.phrases[variables.actualPhrase].pharase_english;
    } else {
        constants.showPhrase.textContent = constants.phrases[variables.actualPhrase].pharase_spanish;
    }
}

/**
 * Small algorithm to generate a different phrase and make sure it is
 * not repeated unless all of them have already been generated.
 */
export function updatePhrase() {
    if (variables.seenPhrases.length === variables.realPhrasesArrayIndexes) {
        variables.seenPhrases = [];
    }

    let random;
    do {
        random = Math.floor(Math.random() * variables.realPhrasesArrayIndexes);
    } while (variables.seenPhrases.includes(random));

    variables.seenPhrases.push(random);
    variables.actualPhrase = random;

    // Old linear operation:
    //
    // if (variables.actualPhrase == variables.realPhrasesArrayIndexes) {
    //     variables.actualPhrase = 0;
    //     return;
    // }
    //
    // variables.actualPhrase++;
    //
}

export function deviceButton(e) {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) {
        constants.topauseButton.innerHTML = mobilePauseButtonContent;

        if (e) {
            if (constants.topauseButton.classList.contains('variables.progressBarIsPaused')) {
                variables.progressBarIsPaused = false;
                constants.topauseButton.classList.remove('variables.progressBarIsPaused');
                constants.topauseButton.innerHTML = mobilePauseButtonContent;
            } else {
                variables.progressBarIsPaused = true;
                constants.topauseButton.classList.add('variables.progressBarIsPaused');
                constants.topauseButton.innerHTML = mobilePlayButtonContent;
            }
        }
    }
}

export default {
    deviceButton,
    updatePhrase,
    nextPhrase,
    changeLang,
    setPause,
    setPlay,
    changePhraseAndManageProgressBar,
    setLang
}