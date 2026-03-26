const express = require('express');
const {request, response} = require("express");
const app = express();
const port = 8080;

// app.get('/users/:userId', (req, res) => {
//     res.send(`User profile for ID: ${req.params.userId}`);
// });

//   Route with parameters
app.get('/users/:userId/books/:bookId', (request, response) => {
    response.send(`User ID is ${request.params.userId},\n Book ID is ${request.params.bookId}`);
});

//  http://localhost:8080/users/123/books/456
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});