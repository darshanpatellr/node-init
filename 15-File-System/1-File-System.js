const fs = require('fs');


// Write file asynchronously with callback
fs.writeFileSync('data.txt', ` {
  "status": 200,
  "data": {
    "name": "Darshan Patoliya",
    "age": 23
  }
}`);

// Read file asynchronously with callback
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:\n', data);
});