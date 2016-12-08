// require the keys.js file that holds the twitter keys
var twitterKeysObject = require('./keys.js');

// the data is received as an object, but original data was an object too
// so peel back one layer and get to the actual keys object
var twitterKeys = twitterKeysObject.twitterKeys;

// console log to verify
console.log(twitterKeysObject);
console.log(twitterKeys);
