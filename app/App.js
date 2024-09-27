import express from 'express';
import path from 'node:path';
import { __dirname } from './utils/dirname.js';
import { phrasesRouter } from './routes/phrases.router.js';
import { staticFilesRouter } from './routes/static.router.js';
import { nf404Middleware } from './middlewares/nf404.middleware.js';

const app = express();

app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, '../../public', 'index.html');
    res.sendFile(indexFile);
});

// Routes.
app.use('/phrases', phrasesRouter);
// app.use(express.static()) dont work in production, idk why.
app.use('/public', staticFilesRouter);

// Not found middleware.
app.use(nf404Middleware);

export default app;
