// let fs = require('fs');
// let rs = fs.createReadStream('./demofile.txt');
// rs.on('open', function () {
//     console.log('The file is open');
// });


// Import the events module
// const EventEmitter = require('events');
let events = require('events');
let myEmitter = new events.EventEmitter();

// Register an event listener
myEmitter.on('greet', () => {
    console.log('Hello there!');
});

myEmitter.on('darshan', () => {
    console.log('Hello, Darshan Patoliya!');
});

// Emit the event
myEmitter.emit('darshan');  // greet etc....
