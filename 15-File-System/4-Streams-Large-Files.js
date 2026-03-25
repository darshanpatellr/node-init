const fs = require('fs');
const { pipeline } = require('stream/promises');
const { Readable } = require('stream');

async function writeLargeFile() {
    // Create a readable stream (could be from HTTP request, etc.)
    const data = Array(1000).fill().map((_, i) => `Line ${i + 1}: ${'DP'.repeat(100)}\n`);
    const readable = Readable.from(data);

    // Create a writable stream to a file
    const writable = fs.createWriteStream('../large-file.txt');

    try {
        // Pipe the data from readable to writable
        await pipeline(readable, writable);
        console.log('Large file written successfully');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

writeLargeFile();