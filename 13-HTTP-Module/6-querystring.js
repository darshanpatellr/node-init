const http = require('http');
const {URL} = require('url');
const querystring = require('querystring');

const server = http.createServer((request, response) => {

    //  Using the newer URL API (Node.js 10+)
    const baseURL = `http://${request.headers.host}/`;
    const paercedUrl = new URL(request.url, baseURL);

    //  Get query parameters
    const params = Object.fromEntries(paercedUrl.searchParams);

    //  Example of building a query string
    const queryObj = {
        name: 'Darshan Patoliya',
        age: 23,
        interests: ['Coding', 'Cricket', 'Traveling']
    };

    const queryStr = querystring.stringify(queryObj);

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({
        status: 200,
        path: paercedUrl.pathname,
        params,
        exampleQueryString: queryStr
    }, null, 2));
});

server.listen(3000);