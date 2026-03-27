const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {request, response} = require("express");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const JWT_SECRET = 'qwertyuiop';

const users = [
    {id: 1, username: 'user1', password: 'password1', role: 'user'},
    {id: 1, username: 'admin', password: 'admin', role: 'admin'}
];


app.post('/login', (req, res) => {
    const {username, password} = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Wrong username or password'
        });
    }

    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});

    res.status(200).json({
        accessToken: token
    });

});

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Authorization header missing!'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Token missing!'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(403).json({
            statusCode: 403,
            message: 'Invalid or expired token'
        });
    }
};

app.get('/profile', authenticateJWT, (request, response) => {
    response.status(200).json({
        statusCode: 200,
        user: request.user
    });
});

app.get('/admin', authenticateJWT, (request, response) => {
    if (request.user.role === 'admin') {
        response.status(200).json({
            statusCode: 200,
            message: 'Admin get access successfully',
            user: request.user
        });
    } else {
        response.status(401).json({
            statusCode: 401,
            message: 'You are not authorized to admin access!'
        });
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
