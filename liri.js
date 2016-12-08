// require the keys.js file that holds the twitter keys
var twitterKeysObject = require('./keys.js');

// require twitter, spotify, and request NPM libraries
var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');

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
		myTweets();
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

// if the my-tweets command is received
function myTweets() {

	// set up credentials object for Twitter access
	var client = new Twitter({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
	});

	console.log(client);
}
