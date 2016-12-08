// require the keys.js file that holds the twitter keys
var twitterKeysObject = require('./keys.js');

// require twitter, spotify, and request NPM libraries
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

// the data is received as an object, but original data was an object too
// so peel back one layer and get to the actual keys object
var twitterKeys = twitterKeysObject.twitterKeys;

// console log to verify
// console.log(twitterKeysObject);
// console.log(twitterKeys);

// possible command line commands include:
// my-tweets, spotify-this-song, movie-this, do-what-it-says
// save the command to a variable so it can be used to switch
var command = process.argv[2];

// switch based on the command received
switch (command) {

	// handle the my-tweets command
	case 'my-tweets':
		break;

	// handle the spotify-this-song command
	case 'spotify-this-song':
		break;

	// handle the movie-this command
	case 'movie-this':
		break;

	// handle the do-what-it-says command
	case 'do-what-it-says':
		break;

	// default response when command is not valid
	default:
		console.log("Command not Valid. Please try again!");
}