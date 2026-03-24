const http = require('https');

http.get('https://api.agify.io/?name=john', response => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => console.log(data));
}).on('error', (error) => {
    console.error(`API Call Error: ${error.message}`);
});