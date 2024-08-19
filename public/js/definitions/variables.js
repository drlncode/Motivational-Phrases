import { phrases } from './constants.js';

export let realPhrasesArrayIndexes = phrases.length - 1;
export let actualPhrase = '';
export let progressBarPorcent = 0;
export let changeIsPending = false;
export let progressBarIsPaused = false;
export let seenPhrases = [];

export default {
    realPhrasesArrayIndexes,
    actualPhrase,
    progressBarPorcent,
    changeIsPending,
    progressBarIsPaused,
    seenPhrases
}