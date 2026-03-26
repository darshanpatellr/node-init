const express = require('express');
const helmet = require('helmet');
const {response} = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());

app.use(requestLogger);

app.get('/', (request, response) => {
    response.status(200).json({message: 'Server Running...'});
});

app.post('/api/register', validationUserCreation, (req, res, next) => {
    res.status(201).json({
        statusCode: 201,
        message: 'User created successfully',
        data : req.body
    });
});

app.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: 'Route - Not Found'
    })
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({message: 'Server error'});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function validationUserCreation(req, res, next) {
    const {username, email, password} = req.body;

    if (!username || !username.length > 3) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Username must be at least 3 characters!'
        });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Valid email is required!'
        });
    }

    if (!password || !password.length > 6) {
        return res.status(404).json({
            statusCode: 400,
            message: 'Password must be at least 6 characters'
        })
    }

    next();
}

function requestLogger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.url}`);
    next();
}


