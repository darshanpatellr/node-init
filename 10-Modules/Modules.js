const http = require('http');
const path = require('path');

// Importing custom modules
const {getCurrentDate, formatCurrency} = require('./utils');
const Logger = require('./logger');

// Create a logger instance
const logger = new Logger('App');

// Create server
const server = http.createServer((req, res) => {
    try {
        logger.log(`Request received for ${req.url}`);

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`
    <h1>Welcome to our app!</h1>
    <p id="clock"></p>

    <script>
        function updateClock() {
            const now = new Date();
            document.getElementById("clock").innerText =
                "Current date: " + now.toLocaleTimeString('en-IN', { hour12: false }) + 
                " : " + now.getMilliseconds();
        }

        setInterval(updateClock, 100); // update every 100ms
        updateClock();
    </script>
`);
        res.write(`<p>Formatted amount: ${formatCurrency(99.99)}</p>`);
        res.end();
    } catch (error) {
        logger.error(error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    logger.log(`Server running at http://localhost:${PORT}`);
});