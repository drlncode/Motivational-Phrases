import { readFile } from 'node:fs/promises';
import { __dirname } from '../utils/dirname.js';

export class PhrasesController {
    static async getPhrases(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        try {
            const data = await readFile(`${__dirname}/../data/phrases.json`, 'utf-8');
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send('500 - Internal Server Error');
        }
    }
}
