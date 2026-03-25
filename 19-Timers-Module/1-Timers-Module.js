const {setTimeout, setInterval, setImmediate,} = require('timers');

console.log('Staring Timers...');

// delayed
setTimeout(() => {
    console.log('This runs after 1 second')
}, 1000);


// Execute repeatedly at interval
let counter = 0;
const interval = setInterval(() => {
    counter++;
    console.log(`Interval tick ${counter}`);
    if (counter >= 5) clearInterval(interval)
}, 1000);

// Execute in the next event loop iteration
setImmediate(() => {
    console.log('This runs in the next iteration of the event loop');
});

