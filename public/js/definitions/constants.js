import { getPhrases } from '../services/getPhrases.js';

export const changeLangBtn = document.querySelector('.translation');
export const toPauseBtn = document.querySelector('.controls');
export const processBar = document.querySelector('.process');
export const showPhrase = document.querySelector('.text');

export const { data: phrases } = await getPhrases({ url: '/phrases' });

export default {
    changeLangBtn,
    toPauseBtn,
    processBar,
    showPhrase,
    phrases
}
