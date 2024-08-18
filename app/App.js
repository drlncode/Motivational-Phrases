import express from 'express';
import { readFile, access, constants } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, '../public', 'index.html');
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
app.get('/public/:folder/:file', async (req, res, next) => {
    const { folder, file } = req.params;
    const filePath = path.join(__dirname, `../public/${folder}`, file);

    try {
        const result = await access(filePath, constants.F_OK);
        res.sendFile(filePath);
    } catch (e) {
        if (e) {
            next(e);
        }
    }
});

app.get('/public/:folder/:subfolder/:file', async (req, res, next) => {
    const { folder, subfolder, file } = req.params;
    const filePath = path.join(__dirname, `../public/${folder}/${subfolder}`, file);

    try {
        const result = await access(filePath, constants.F_OK);
        res.sendFile(filePath);
    } catch (e) {
        if (e) {
            next(e);
        }
    }
});

app.use((req, res) => {
    res.status(404).send('404 Not Found.');
});

export default app;
