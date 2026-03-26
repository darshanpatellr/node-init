const express = require('express');

const app = express();
const port = 8080;

app.use(express.json());
app.use(requestLogger);

let usersList = [
    {id: 1, name: 'Darshan', email: 'dr@gmail.com'},
    {id: 2, name: 'Darshan 2', email: 'dr2@gmail.com'},
];

app.get('/', (req, res) => {
    res.status(200).json({statusCode: 200, message: 'Server Running...'})
});


app.get('/api/users', (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Users fetched successfully',
        data: usersList
    })
});


app.post('/api/users', (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email
    };
    newUser.id = usersList.length + 1;
    usersList.push(newUser);
    res.status(201).json({
        statusCode: 201,
        message: 'User added successfully',
        data: usersList
    });
});


app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = usersList.find(user => user.id === parseInt(id));
    if (!user) {
        res.status(400).json({
            statusCode: 400,
            message: 'User not found !'
        });
    } else {
        res.status(200).json({
            statusCode: 200,
            message: 'User get successful',
            data: user
        });
    }
});


app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = usersList.find(user => user.id === parseInt(id));
    if (!user) {
        res.status(400).json({
            statusCode: 400,
            message: 'User not found !'
        });
    } else {
        user.name = req.body.name;
        user.email = req.body.email;
        res.status(200).json({
            stausCode: 200,
            message: 'User updated successful',
            data: usersList
        })
    }
});


app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const index = usersList.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
        res.status(400).json({
            statusCode: 400,
            message: 'User not found !'
        });
    } else {
        usersList.splice(index, 1);
        res.status(200).json({
            stausCode: 200,
            message: 'User deleted successful',
            data: usersList
        });
    }
});

app.use((req, res) => {
    res.status(404).json({statusCode: 404, message: 'Route - Not Found : ' + req.url});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


function requestLogger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.url}`);
    next();
}