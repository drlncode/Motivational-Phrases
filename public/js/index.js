(async () => {
    const changeLangBtn = document.querySelector('.translation');
    const URL = '../phrases';
    const phrases = await fetch(URL)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => console.log(err));
    const topauseButton = document.querySelector('.controls');

    let numPhrases = phrases.length - 1;
    let actualPhrase = 0;
    let progress = 0;
    let pending = false;
    let paused = false;
    let processBar = document.querySelector('.process');
    let showPhrase = document.querySelector('.text');

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
                if (!pending && !paused) {
                    progress++;
                }

                processBar.style.width = `${progress}%`;

                // I think it goes without saying that almost how this works depends on the progress variable.
                if (progress === 100) {
                    showPhrase.classList.remove('show');
                    progress = 0;
                    pending = true;

                    setTimeout(() => {
                        updatePhrase();
                        nextPhrase();
                        showPhrase.classList.add('show');
                        pending = false;
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
            paused = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 's') {
            paused = false;
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

    function updatePhrase() {
        if (actualPhrase == numPhrases) {
            actualPhrase = 0;
            return;
        }

        actualPhrase++;
    }

    function deviceButton(e) {
        const pcPauseButtonContent = topauseButton.innerHTML;
        const mobilePauseButtonContent = `
            <p> <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"
                fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-player-pause">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2
                2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /><path d="M17 4h-2a2 2 0 0 0 -2
                2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /></svg>
            Pause</p>
        `;
        const mobilePlayButtonContent = `
            <p> <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"
                fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-player-play">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4v16a1 1 0 0 0 1.524 .852l13
                -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" /></svg>
            Play</p>
        `;

        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || 
            navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || 
            navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || 
            navigator.userAgent.match(/Windows Phone/i)) {
            topauseButton.innerHTML = mobilePauseButtonContent;

            if (e) {
                if (topauseButton.classList.contains('paused')) {
                    paused = false;
                    topauseButton.classList.remove('paused');
                    topauseButton.innerHTML = mobilePauseButtonContent;
                } else {
                    paused = true;
                    topauseButton.classList.add('paused');
                    topauseButton.innerHTML = mobilePlayButtonContent;
                }
            }
        }
    }
})();
