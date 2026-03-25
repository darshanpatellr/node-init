let events = require('events');
let eventEmitter = new events.EventEmitter();

let myEventHandler = function () {
    console.log('I hear a scream!');
}

eventEmitter.on('scream', ()=>{
    myEventHandler();
});

eventEmitter.emit('scream');

