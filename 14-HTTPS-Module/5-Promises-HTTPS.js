const https = require('https');
const {URL} = require('url');

function httpsRequestWithPromise(options, data = null) {
    return new Promise((resolve, reject) => {
        const request = https.request(options, (response) => {
            let responseData = '';

            //  Collect response data
            response.on('data', (chunk) => {
                responseData += chunk;
            });

            //  Process complete response
            response.on('end', () => {
                try {
                    const contentType = response.headers['content-type'] || '';
                    const isJSON = /^application\/json/.test(contentType);

                    const responseResolved = {
                        statusCode: response.statusCode,
                        headers: response.headers,
                        data: isJSON ? JSON.parse(responseData) : responseData
                    };

                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        resolve(responseResolved);
                    } else {
                        const error = new Error(`Request failed with status code ${response.statusCode}`);
                        error.response = responseData;
                        reject(error);
                    }
                } catch (error) {
                    error.response = {data: responseData};
                    reject(error);
                }
            });
        });

        // Handle errors
        request.on('error', (e) => {
            reject(e);
        });

        // Write data if provided
        if (data) {
            request.write(data);
        }

        // End the request
        request.end();
    });
}

async function fetchData() {
    try {
        const url = new URL('https://jsonplaceholder.typicode.com/posts/1');

        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            timeout: 5000 // 5 seconds
        };

        const response = await httpsRequestWithPromise(options);
        console.log('Response:', response.data);
        console.log('Response JSON:\n', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

// Run the example
fetchData().then(r => console.log('\n Operation Complete!'));