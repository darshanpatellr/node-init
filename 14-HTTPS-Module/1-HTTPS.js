const https = require('https');
const fs = require('fs');
const path = require('path');

// Path to your SSL/TLS certificate and key
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, '../key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert.pem')),
    // Enable all security features
    minVersion: 'TLSv1.2',
    // Recommended security settings
    secureOptions: require('constants').SSL_OP_NO_SSLv3 |
        require('constants').SSL_OP_NO_TLSv1 |
        require('constants').SSL_OP_NO_TLSv1_1
};

const server = https.createServer(sslOptions, (request, response) => {
    // Security headers
    response.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('X-Frame-Options', 'SAMEORIGIN');
    response.setHeader('X-XSS-Protection', '1; mode=block');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    const {method, url, headers} = request;

    if (url === '/') {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end('<h1>Welcome to the Secure Server</h1><p>Your connection is encrypted!</p>');
    } else if (url === '/api/status') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({status: 'ok', time: new Date().toISOString()}));
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('404 Not Found');
    }
});

server.on('error', (error) => {
    console.error('Server error:', error);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at https://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});