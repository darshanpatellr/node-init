const http = require('http');

const server = http.createServer((request, response) => {
    const {url, method} = request;

    response.writeHead(200, {'content-type': 'text/plain'});
    response.end(`You made a ${method} request to ${url}`);
});


server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
});