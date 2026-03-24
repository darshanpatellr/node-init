const https = require('https');
const {URL} = require('url');
const {response} = require("express");

const apiUrl = new URL('https://jsonplaceholder.typicode.com/todos/1');

const options = {
    hostname: apiUrl.hostname,
    port: 443,
    path: apiUrl.pathname + apiUrl.search,
    method: 'GET',
    headers: {
        'User-Agent': 'MySecureApp/1.0',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
    },
    // Security settings
    rejectUnauthorized: true, // Verify the server certificate (default: true)
    // Timeout in milliseconds
    timeout: 10000, // 10 seconds
};

console.log(`Making request to: https://${options.hostname}${options.path}`);

const request = https.request(options, (response) => {
    const {statusCode, statusMessage, headers} = response;
    const contentType = headers['content-type'] || '';

    console.log(`Status: ${statusCode} ${statusMessage}`);
    console.log('Headers:', headers);

    // Handle redirects
    if (statusCode >= 300 && statusCode < 400 && headers.location) {
        console.log(`Redirecting to: ${headers.location}`);
        // In a real app, you'd handle the redirect
        response.resume(); // Discard the response body
        return;
    }

    // Check for successful response
    let error;
    if (statusCode !== 200) {
        error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`);
    }

    if (error) {
        console.error(error.message);
        response.resume(); // Consume response data to free up memory
        return;
    }

    // Process the response
    let rawData = '';
    response.setEncoding('utf8');

    // Collect chunks of data
    response.on('data', (chunk) => {
        rawData += chunk;
    });

    // Process the complete response
    response.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log('Response data:', parsedData);
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
        }
    });
});

request.on('error', (e) => {
    console.error(`Request error: ${e.message}`);
    if (e.code === 'ECONNRESET') {
        console.error('Connection was reset by the server');
    } else if (e.code === 'ETIMEDOUT') {
        console.error('Request timed out');
    }
});

// Set a timeout for the entire request (including DNS lookup, TCP connect, etc.)
request.setTimeout(15000, () => {
    request.destroy(new Error('Request timeout after 15 seconds'));
});

request.on('socket', (socket) => {
    socket.on('error', (error) => {
        console.error('Socket error:', error.message);
        request.destroy(error);
    });
    // Set a timeout for the socket connection
    socket.setTimeout(5000, () => {
        req.destroy(new Error('Socket timeout after 5 seconds'));
    });
});

// End the request (required to send it)
request.end();