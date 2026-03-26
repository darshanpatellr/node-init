const express = require('express');
const app = express();
const port = 8080;

app.get('/error', (req, res) => {
    throw new Error('Something went wrong');
});

app.get('/async-error', (req, res, next) => {
    // Simulating an asynchronous operation that fails
    setTimeout(() => {
        try {
            // Something that might fail
            const result = nonExistentFunction(); // This will throw an error
            res.send(result);
        } catch (error) {
            next(error); // Pass errors to Express
        }
    }, 100);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res
        .status(500)
        .json({
            message: 'Something broke!',
            error: err.stack
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});