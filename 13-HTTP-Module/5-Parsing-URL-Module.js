const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
    // Parse the URL
    const parsedUrl = url.parse(request.url, true);

    // Get different parts of the URL
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({
        status: 200,
        message: {
            'message': 'Successful',
        },
        pathName,
        query,
        fullUrl: pathName
    }, null, 2));
});

server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
});