import app from './app/App.js';
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server runnig in http://localhost:${PORT}`);
});