const express = require('express');
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');

const app = express();
const port = 8080;

app.use('/users', userRouter);
app.use('/products', productRouter);

// http://localhost:8080/
app.get('/', (request, response) => {
    response.send('Main application home page');
});

app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});