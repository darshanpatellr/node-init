let http = require('http')

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});

    const osName = require('os');


    response.end("Hello" +
        "\n" +
        "How are you?" +
        "\n" +
        "OS:" + osName.platform());
}).listen(8080);