import express from 'express';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { __dirname } from './utils/dirname.js';
import { staticFiles } from './routes/static.route.js';

const app = express();

console.log(__dirname);

app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, '../../public', 'index.html');
    res.sendFile(indexFile);
});

app.get('/phrases', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const data = await readFile(`${__dirname}/data/phrases.json`, 'utf-8');
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        res.status(500).send('500 - Internal Server Error');
        console.log(error);
    }
});

// app.use(express.static()) dont work in production, idk why.
app.get('/public', staticFiles);

app.use((req, res) => {
    res.status(404).send('404 Not Found.');
});

export default app;
