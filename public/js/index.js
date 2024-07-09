(async () => {
    const changeLangBtn = document.querySelector('.translation');
    const URL = '../phrases';
    const phrases = await fetch(URL)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => console.log(err));

    let numPhrases = phrases.length - 1;
    let actualPhrase = 0;
    let progress = 0;
    let pending = false;
    let paused = false;
    let processBar = document.querySelector('.process');
    let showPhrase = document.querySelector('.text');

    if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'english');
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            nextPhrase();
            showPhrase.classList.add('show');

            setInterval(() => {
                if (!pending && !paused) {
                    progress++;
                }

                processBar.style.width = `${progress}%`;

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

    changeLangBtn.addEventListener('click', changeLang);

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
})();
