// Import both default and named exports
import main, { VERSION } from './main.mjs';
console.log(VERSION); // 1.0.0
main(); // Main function





// Import specific named exports
import { sayHello, sayGoodbye } from './greetings.mjs';
sayHello(); // Hello

// Rename imports to avoid naming conflicts
import { add as sum, subtract as minus } from './math.mjs';
console.log(sum(5, 3)); // 8

// Import all named exports as an object
import * as math from './math.mjs';
console.log(math.add(7, 4)); // 11