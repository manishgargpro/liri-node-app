var keys = require("keys.js");

var fs = require("fs");

var twitterKeys = keys.twitterKeys;

var spotifyKeys = keys.spotifyKeys;

var Twitter = require("twitter");

var client = new Twitter(twitterKeys);

var params = {
  screen_name: "EhhWhateves"
};

var Spotify = require("node-spotify-api");

var spotify = new Spotify(spotifyKeys);

var request = require("request");

var action = process.argv[2];

var value = parseInput(process.argv, 3);

function parseInput(arr, st){
	var urlArg = "";
	for (i = st; i < arr.length; i++) {
	  if (i > st && i < arr.length) {
	    urlArg = urlArg + "+" + arr[i];
	  } else {
	    urlArg += arr[i];
	  }
	}
	return urlArg;
}

function myTweets() {
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (error) { console.log(error) };
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text + ": " + tweets[i].created_at);
    }
  })
}

function spotifyThis() {
	if (value == "") {
		value = "The+Sign+Ace+of+Base";
	}
  spotify.search({ type: 'track', query: value }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
    }
    var song = data.tracks.items[0];
    var artistArr = [];
    for (var i = 0; i < song.artists.length; i++) {
    	artistArr.push(song.artists[i].name + " ");
    }
    console.log("Artists: " + artistArr);
    console.log("Song name: " + song.name);
    console.log("Preview: "+ song.preview_url);
    console.log("Album: " + song.album.name);
  });
}

function movieThis(){
	if (value == "") {
		value = "Mr+Nobody";
	}
	request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (error) {
      console.log('Error: ' + error);
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

function doWhat(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {console.log("Error: " + error)}
		var dataArr = data.split(",");
		action = dataArr[0];
		value = parseInput(dataArr, 1);
		parseAction(action);
	});
}

function parseAction(act){
	switch (act) {
	  case "my-tweets":
	    myTweets();
	    break;
	  case "spotify-this-song":
	  	spotifyThis();
	  	break;
	  case "movie-this":
	  	movieThis();
	  	break;
	  case "do-what-it-says":
	  	doWhat();
	  	break;
	}
}

parseAction(action);