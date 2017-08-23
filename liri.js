var keys = require("keys.js");

var fs = require("fs");

var twitterKeys = keys.twitterKeys;

var spotifyKeys = keys.spotifyKeys;

var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: 'Isc8YLs6kXbZvHhznToytZBG9',
  consumer_secret: '8H2STzzucVhVwt6mFi0sMfwH3jCpph380zLpmCD6YVdYiMwWPg',
  access_token_key: '899361522367025153-CZviOTKlOSJOibCIbHDSBeQvUPlfaxI',
  access_token_secret: 'Hh7zsZrxKWnyoIgn0YMendvw80J4jvNnhG1sJB1fJc8WZ'
});

var Spotify = require("node-spotify-api");

var spotify = new Spotify({
  id: "a68c48ab60b345e49f30d5678822c3a1",
  secret: "cc6bc9071cc5409e8498187dd1f9a299"
});

var request = require("request");

var params = {
  screen_name: "EhhWhateves"
}

var action = process.argv[2];

var value = process.argv[3];

function myTweets() {
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (error) { console.log(error) };
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text + ": " + tweets[i].created_at);
    }
  })
}

function spotifyThis() {
	var songInput = "";
	for (i = 3; i < process.argv.length; i++) {
	  if (i > 3 && i < process.argv.length) {
	    songInput = songInput + "+" + process.argv[i];
	  } else {
	    songInput += process.argv[i];
	  }
	}
  spotify.search({ type: 'track', query: songInput }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
    }
    var song = data.tracks.items[0];
    var artistArr = [];
    for (var i = 0; i < song.artists.length; i++) {
    	artistArr.push(song.artists[i].name + " ");
    	// if (i < 0) {
    	// 	artistArr.push(", " + song.artists[i].name);
    	// }
    }
    console.log("Artists: " + artistArr);
    console.log("Song name: " + song.name);
    console.log("Preview: "+ song.href);
    console.log("Album: " + song.album.name)
  });
}

function movieThis(){
	var movieInput = "";
	for (i = 3; i < process.argv.length; i++) {
	  if (i > 3 && i < process.argv.length) {
	    movieInput = movieInput + "+" + process.argv[i];
	  } else {
	    movieInput += process.argv[i];
	  }
	}
	request("http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (error) {
      console.log('Error occurred: ' + error);
    }
    var movie = JSON.parse(body);
		console.log("Title: " + movie.Title);
		console.log("Year: " + movie.Year);
		console.log("IMDB: " + movie.Ratings[0].Value);
		console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
		console.log("Country: " + movie.Country);
		console.log("Language: " + movie.Language);
		console.log("Plot: " + movie.Plot);
		console.log("Cast: " + movie.Actors);
	})
}

switch (action) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
  	spotifyThis();
  	break;
  case "movie-this":
  	movieThis();
  	break;
    // case "do-what-it-says":
}