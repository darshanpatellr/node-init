const express = require('express');
const app = express();
const port = 8080;

app.use(requestLogger);

app.use((req, res, next) => {
    console.log("Middleware 1: This always run!");
    next();
});

app.use((req, res, next) => {
    console.log("Middleware 2: This also always run!");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

function requestLogger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.url}`);
    next();
}