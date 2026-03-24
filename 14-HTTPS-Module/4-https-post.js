const https = require('https');
const {URL} = require('url');
const {json} = require("express");

// Request data
const postData = JSON.stringify({
    title: 'Title-Darshan',
    body: 'body-Darshan',
    userId: 1
});

const url = new URL('https://jsonplaceholder.typicode.com/posts');

const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'MySecureApp/1.0',
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 seconds
};

console.log('Sending POST request to:', url.toString());

const request = https.request(options, (response) => {
    console.log(`Status Code: ${response.statusCode}`);
    console.log('Headers:', response.headers);

    let responseData = '';
    response.setEncoding('utf8');

    // Collect response data
    response.on('data', (chunk) => {
        responseData += chunk;
    });

    // Process complete response
    response.on('end', () => {
        try {
            const parsedData = JSON.parse(responseData);
            console.log('Response:', parsedData);
            console.log('Response JSON:\n', JSON.stringify(parsedData, null, 2));
        } catch (e) {
            console.error('Error parsing response:', e.message);
        }
    });
});

// Write data to request body
request.write(postData);

// End the request
request.end();


