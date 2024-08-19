import constants from './definitions/constants.js';
import functions from './functions/index.js';

// Generating the phrase index to show.
functions.updatePhrase();

// Detecting the device to change the pause button type.
functions.deviceButton();

// Setting the phrase lenguage.
functions.setLang();

// Here the magic happens, changing the current phrase and updating the process bar to change it.
window.addEventListener('load', () => {
    // Initial delay.
    setTimeout(() => {
        functions.changePhraseAndManageProgressBar()
    }, 100);
});

// Event listener for mobile button.
constants.topauseButton.addEventListener('click', functions.deviceButton);

// Change the lang.
constants.changeLangBtn.addEventListener('click', functions.changeLang);

// Event listeners for pc "button".
document.addEventListener('keydown', functions.setPause);

document.addEventListener('keyup', functions.setPlay);
