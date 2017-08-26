var keys = require("keys.js");

var fs = require("fs");

var Twitter = require("twitter");

var client = new Twitter(keys.twitterKeys);

var params = {
  screen_name: "EhhWhateves"
};

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotifyKeys);

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

function writeLog(obj){
	fs.appendFile("log.txt", ">>>" + obj + "\n", function(error){
		if (error) {
	    console.log(error);
	  }
	})
}

function myTweets() {
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (error) {
    	console.log(error);
    	writeLog(action + ": " + error + "\n");
    } else {
			var logText = "";
	    for (var i = 0; i < tweets.length; i++) {
	      console.log(tweets[i].text + ": " + tweets[i].created_at);
	    	logText += tweets[i].text + ": " + tweets[i].created_at + "\n"
	    }
      writeLog(action + "\n" + ": " + logText);
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
      writeLog(action + ": " + err + "\n");
    } else {
	    var song = data.tracks.items[0];
	    var artistArr = [];
	    for (var i = 0; i < song.artists.length; i++) {
	    	artistArr.push(song.artists[i].name + " ");
	    }
	    console.log("Artists: " + artistArr);
	    console.log("Song name: " + song.name);
	    console.log("Preview: " + song.preview_url);
	    console.log("Album: " + song.album.name);
			var logText = "";
	    logText = "Artists: " + artistArr + "\n" + "Song name: " + song.name + "\n" + "Preview: " + song.preview_url + "\n" + "Album: " + song.album.name + "\n";
	    writeLog(action + ": " + "\n" + logText);
  	}
  });
}

function movieThis(){
	var logText = "";
	if (value == "") {
		value = "Mr+Nobody";
	}
	request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (error) {
      console.log('Error: ' + error);
      writeLog(action + ": " + error + "\n");
    } else{
	    var movie = JSON.parse(body);
			console.log("Title: " + movie.Title);
			console.log("Year: " + movie.Year);
			console.log("IMDB: " + movie.Ratings[0].Value);
			console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
			console.log("Country: " + movie.Country);
			console.log("Language: " + movie.Language);
			console.log("Plot: " + movie.Plot);
			console.log("Cast: " + movie.Actors);
			logText = "Title: " + movie.Title + "\n" + "Year: " + movie.Year + "\n" + "IMDB: " + movie.Ratings[0].Value + "\n" + "Rotten Tomatoes: " + movie.Ratings[1].Value + "\n" + "Country: " + movie.Country + "\n" + "Language: " + movie.Language + "\n" + "Plot: " + movie.Plot + "\n" + "Cast: " + movie.Actors + "\n";
			writeLog(action + ": " + "\n" + logText)
		}
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