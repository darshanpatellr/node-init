const https = require('https');
const {URL} = require('url');
const {response} = require("express");

const url = new URL('https://jsonplaceholder.typicode.com/posts/1');

const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'MySecureApp/1.0'
    }
};

console.log(`Fetching data from: ${url}`);

const request = https.get(options, (response) => {
    const {statusCode, statusMessage, headers} = response;
    const contentType = response.headers['content-type'];

    if (statusCode !== 200) {
        console.error(`Request failed with status code: ${statusCode}`);
        response.resume(); // Consume response data to free up memory
        return;
    }

    if (!/^application\/json/.test(contentType)) {
        console.error(`Expected JSON but got ${contentType}`);
        response.resume();
        return;
    }

    let rawData='';
    response.setEncoding('utf8');

    response.on('data', (chunk) => {
        rawData += chunk;
    });

    response.on('end', () => {
       try {
           const parsedData = JSON.parse(rawData);
           console.log('Received data:\n', parsedData);
       } catch (error) {
           console.error('Error parsing JSON:', e.message);
       }
    });

});

request.on('error', (e) => {
    console.error(`Error: ${e.message}`);
});

// Set a timeout
request.setTimeout(10000, () => {
    console.error('Request timeout');
    request.destroy();
});