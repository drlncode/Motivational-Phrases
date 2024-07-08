import express from 'express';
import { readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    app.use(express.static('public'));
});

app.get('/phrases', async (req, res) => {
    try {
        const data = await readFile(`${__dirname}/data/phrases.json`, 'utf-8');
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        res.status(500).send('500 - Internal Server Error');
        console.log(error);
    }
});

app.use((req, res) => {
    res.status(404).send('404 Not Found.');
});

export default app;