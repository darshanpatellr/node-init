const http = require('http');

//  HTML

// const server = http.createServer((request, resposne) => {
//     resposne.writeHead(200, {'Content-Type': 'text/plain'});
//     resposne.end("Hello HTTP Server Ready!");
// });

//  JSON

const server = http.createServer((request, resposne) => {
    resposne.writeHead(200, {'Content-Type': 'application/json'});
    resposne.end(JSON.stringify({name: "Darshan Patoliya"}));
});


const PORT = 3000;

server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});