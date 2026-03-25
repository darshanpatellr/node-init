let url = require('url');
// let adr = 'http://localhost:8080/default.htm?year=2017&month=february';
let adr = 'hhttps://jsonplaceholder.typicode.com/todos/1?year=2017&month=february';
let q = url.parse(adr, true);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);

let qdata = q.query;
console.log(qdata.year);
console.log(qdata.month);


// href: The full URL that was parsed
// protocol: The protocol scheme (e.g., 'http:')
// host: The full host portion (e.g., 'example.com:8080')
// hostname: The hostname portion (e.g., 'example.com')
// port: The port number if specified
// pathname: The path section of the URL
// search: The query string including the leading ?
// query: Either the query string without the ?, or a parsed query object
// hash: The fragment identifier including the #