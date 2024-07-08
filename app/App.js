import express from 'express';
import { readFile } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));

app.get('/pharases', (req, res) => {
    readFile(`${__dirname}/data/pharases.json`, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('500 - Internal Server Error');
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.use((req, res) => {
    res.status(404).send('404 Not Found.');
});

export default app;