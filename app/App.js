import express from 'express';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, '../public', 'index.html');
    res.sendFile(indexFile);
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

// app.use(express.static()) dont work in production, idk why.
app.get('/public/js/:file', (req, res, next) => {
    const { file } = req.params;
    const filePath = path.join(__dirname, '../public/js', file);
    
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).send('404 Not Found.');
    });
}); 

app.get('/public/css/:file', (req, res) => {
    const { file } = req.params;
    const filePath = path.join(__dirname, '../public/css', file);
    
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).send('404 Not Found.');
    });
});

app.use((req, res) => {
    res.status(404).send('404 Not Found.');
});

export default app;