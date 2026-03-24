// Set status code and multiple headers

const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'X-Powered-By': 'Node.js',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': 'sessionid=abc123; HttpOnly'
    });
    // response.end('<h1>Hello, World!</h1>');
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname; // The path without query string
    const query = parsedUrl.query;

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
        pathname,
        query,
        fullUrl: req.url
    }, null, 2));
});

const PORT = 3000;

server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})