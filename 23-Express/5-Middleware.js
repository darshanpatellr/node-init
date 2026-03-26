const express = require('express');
const {request} = require("express");
const app = express();
const port = 8080;

//  Middleware to parse JSON request bodies
app.use(express.json());

//   Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({extended: true}));

//  Middleware to serve static files from a directory
app.use(express.static('public'));


app.post('/api/user', (request, resposne) => {
    console.log(request.body);
    resposne
        .status(201)
        .json({
            message: 'User Created',
            user: request.body
        });
});

app.use((request, response) => {
    response
        .status(404)
        .json({
            status: 404,
            message: 'Page Not Found'
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});