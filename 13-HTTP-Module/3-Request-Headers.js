const http = require('http');

const server = http.createServer((request, response) => {
    console.log(request.headers);

    const userAgent = request.headers['user-agent'];
    const acceptLanguage = request.headers['accept-language'];

    response.writeHead(200, {'content-type': 'text/plain'});
    response.end(`User Agent: ${userAgent}\nAcceptLanguage: ${acceptLanguage}`);
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});