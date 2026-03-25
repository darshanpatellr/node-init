let events = require('events');
let eventEmitter = new events.EventEmitter();

// once
eventEmitter.once('connection', () => {
    console.log('First connection established');
});


eventEmitter.emit('connection'); // This will trigger the listener "once"
eventEmitter.emit('connection'); // This won't trigger the listener again

// With Parameter/value
eventEmitter.on('userJoined', (username, userId) => {
    console.log(`${username} (${userId}) has joined the chat!`);
});

eventEmitter.emit('userJoined','Darshan Patel', 23);
eventEmitter.emit('userJoined','Darshan Patel', 23);