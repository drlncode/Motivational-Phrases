import { getPhrases } from '../services/getPhrases.js';

export const changeLangBtn = document.querySelector('.translation');
export const toPauseBtn = document.querySelector('.controls');
export const processBar = document.querySelector('.process');
export const showPhrase = document.querySelector('.text');

const URL = 'https://motivational-phrases-demo.vercel.app/phrases';
export const { data: phrases } = await getPhrases({ url: URL });

export default {
    changeLangBtn,
    toPauseBtn,
    processBar,
    showPhrase,
    phrases
}