// require the keys.js file that holds the twitter keys
var twitterKeysObject = require('./keys.js');

// require twitter, spotify, and request NPM libraries
var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');

// require Node built in fs library package for filesystem access
var fs = require('fs');

// the data is received as an object, but original data was an object too
// so peel back one layer and get to the actual keys object
var twitterKeys = twitterKeysObject.twitterKeys;

// possible command line commands include:
// my-tweets, spotify-this-song, movie-this, do-what-it-says
// save the command to a variable so it can be used to switch
var command = process.argv[2];

// and also grab the commandArgument
var commandArgument = process.argv[3];

// switch based on the command received
switch (command) {

	// handle the my-tweets command
	case 'my-tweets':
		myTweets();
		break;

	// handle the spotify-this-song command
	case 'spotify-this-song':
		mySpotify(commandArgument);
		break;

	// handle the movie-this command
	case 'movie-this':
		movieThis(commandArgument);
		break;

	// handle the do-what-it-says command
	case 'do-what-it-says':
		doWhatItSays();
		break;

	// default response when command is not valid
	default:
		console.log("Command not Valid. Please try again!");

// end the switch statement
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

	// get the 20 most recent tweets, making sure to exclude replies and retweets
	client.get('statuses/user_timeline', {count: 20, trim_user: false, exclude_replies: true, include_rts: false}, function(error, tweets, response) {

		// if an error is caught, display that and exit out of the function
		if (error) return console.log('Twitter error: ' + error);

		// loop through the 20 returned tweets and log their time and content
		for (var i=0; i<tweets.length; i++) {
			logThis('-------------------')
			// console.log('Tweet #' + (i+1));
			logThis(tweets[i].created_at);
			logThis(tweets[i].text);
		}

	// end the get function
	});

// end the myTweets function
}

// if the spotify-this-song command is received
function mySpotify(receivedSong) {

	// first save the name of the song
	// if it is provided from command line then use that otherwise
	// set it to 'The Sign' by Ace of Base
	// using ternary function seems to be the easiest way to do this
	// basically, if receivedArgument exists then set it to that otherwise 'The Sign'
	var mySong = receivedSong ? receivedSong : 'The Sign Ace of Base';

	// run a search on the Spotify API by track name for mySong
	Spotify.search({ type: 'track', query: mySong }, function(err, data) {

		// if an error is caught in the call, display that and exit the function
		if (err) return console.log('Spotify Error: ' + err);

		// if the song is not found in the Spotify database, log that and exit the function
		if (data.tracks.items.length == 0) return (console.log('No such song found!'));

		// log out the song details, but go with the 0th item returned as API can return
		// multiple hits - basicaly go with the best match
		logThis('-------------------')
		logThis('Artist Name: ' + data.tracks.items[0].artists[0].name);
		logThis('Song Name: ' + data.tracks.items[0].name);
		logThis('Preview Link: ' + data.tracks.items[0].preview_url);
		logThis('Album Title: ' + data.tracks.items[0].album.name);

	// end the search function
	});

// end the mySpotify function
}

// if the movie-this command is received
function movieThis(receivedMovie) {

	// first save the name of the movie if provided from command line
	// otherwise default to "Mr. Nobody"
	// use ternary function for ease of use
	var myMovie = receivedMovie ? receivedMovie : 'Mr. Nobody';

	// Then run a request to the OMDB API with the movie specified
	Request("http://www.omdbapi.com/?t=" + myMovie + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {

    		// Parse the returned data (body) and display movie info
    		// console.log(JSON.parse(body));
    		logThis('-------------------')
    		logThis('Movie Title: ' + JSON.parse(body).Title);
    		logThis('Release Year: ' + JSON.parse(body).Year);
    		logThis('IMDB Rating: ' + JSON.parse(body).imdbRating);
    		logThis('Production Country: ' + JSON.parse(body).Country);
    		logThis('Language: ' + JSON.parse(body).Language);
    		logThis('Plot: ' + JSON.parse(body).Plot);
    		logThis('Actors/Actresses: ' + JSON.parse(body).Actors);
    		logThis('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating);
    		logThis('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
  		}

  	// end the request function
	});

// end the movieThis function
}

// if the do-what-it-says command is received
function doWhatItSays() {

	// read in the random.txt file
	fs.readFile('random.txt', 'utf8', function(error, data) {

	// if an error is caught in the read, display that and exit the function
	if (error) return console.log('Filesystem Read Error: ' + error);

	// split data into an array of function name and argument
	var dataObject = data.split(',');

	// define the function name and argument name
	var myFunction = dataObject[0];
	var myArgument = dataObject[1];

	// modify the myFunction received into the function names used in this app
	switch (myFunction) {
		case 'my-tweets':
			myFunction = 'myTweets';
			break;
		case 'spotify-this-song':
			myFunction = 'mySpotify';
			break;
		case 'movie-this':
			myFunction = 'movieThis';
			break;
		default:
			console.log('Unexpected error in doWhatItSays function');
	}

	// now that we have myFunction correctly formatted, use eval to evaluate it
	// and send it the argument too
	eval(myFunction)(myArgument);

	// end the readFile function
	});

// end the doWhatItSays function
}

// logging function
function logThis(dataToLog) {

	console.log(dataToLog);

}