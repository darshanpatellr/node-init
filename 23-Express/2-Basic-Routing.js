const express = require('express');
const {request, response} = require("express");
const app = express();
const port = 8080;

// Respond to GET request on the root route
app.get('/', (request, response) => {
    response.send('GET request to the homepage');
});

// Respond to POST request on the root route
app.post('/', (request, response) => {
    response.send('POST request to the homepage');
});

// Respond to GET request on the /about route
app.get('/about', (request, response) => {
    response.send('About page');
});

// Catch all other routes
// app.all('*', (request, response) => {
//     response.status(404).send('404 - Page not found');
// });

// 404 handler (BEST WAY)
app.use((request, response) => {
    response.status(404).send('404 - Page not found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});