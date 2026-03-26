const express = require('express');
const {request, response} = require("express");
const app = express();
const port = 8080;

app.get('/search', (request, response) => {
    const {q, category} = request.query;
    response.send(`Search Query: ${q}, Category: ${category || 'none'}`);
});

// http://localhost:8080/search?q=darshan&category=android

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});