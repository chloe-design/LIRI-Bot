//the dotenv package
require("dotenv").config();

//import the keys.js file
var keys = require("./keys.js");

// require file systems
var fs = require("fs");

// require axios
var axios = require("axios");

// require moment
var moment = require("moment");

//Spotify Keys
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

inquirer.prompt([
    {
        type: 'input',
        name: 'command',
        message: 'Enter in a request from: search for concert, search for song, search for a movie and do what it says',
    }


]).then(function (response) {
    switch (response.call) {
        case "Search for Concert":
            searchforconcert();
            break;
        case "Search for Song":
            spotify();
            break;
        case "Search for a Movie":
            movie();
            break;
        case "Do what it Says":
            dowhatitsays();
            break;

        default:
            console.log("Please enter one of the following commands: 'search for concert', 'search for song', 'search for movie', 'do-what-it-says' followed by what you would like to search for.")
    };

    
liriCommand(userInput, searchResult);


function spotify() {
    if (!searchResult) {
        searchResult = "Ain't No Mountain High enough"
        console.log("\nIf you would like to search for a specific song, please insert it after 'search for song'.\nIn the meantime, here is a song I recommend:")
    };

    // spotify search format
    spotify.search({ type: 'track', query: searchResult, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        // console.log(JSON.stringify(data, null, 2));

        console.log("\n-----------------------\n\nArtist: " + data.tracks.items[0].artists[0].name +
            "\nSong: " + data.tracks.items[0].name +
            "\nAlbum: " + data.tracks.items[0].album.name +
            "\nSpotify Link: " + data.tracks.items[0].external_urls.spotify + "\n\n-----------------------\n");

        
        var artist = data.tracks.items[0].artists[0].name;
        var song = data.tracks.items[0].name;
        var album = data.tracks.items[0].album.name;
        var songUrl = data.tracks.items[0].external_urls.spotify;

        var logSpotify = "\n\n-----Spotify Log-----" + "\nArtist: " + artist + "\nSong: " + song + "\nAlbum: " + album + "\nSpotify Link: " + songUrl + "\n";
        // appending information to log.txt file
        fs.appendFile("log.txt", logSpotify, function (error) {
            if (error) throw error;
            console.log("Saved!");
        });
    });
};

function searchforconcert() {
    // if no search command is entered, print Taylor Swift's concert info
    if (!searchResult) {
        searchResult = "Ariana Grande"
        console.log("\nIf you would like to search for a specific artist, please insert it after 'search for concert'.\nIn the meantime, here is the information for Taylor's upcoming event:")
    };
    // get Bands in Town API
    axios.get("https://rest.bandsintown.com/artists/" + searchResult + "/events?app_id=codingbootcamp").then(
        function (response) {

            if (!response.data[0]) {
                console.log("\n-----------------------\n\nSorry, this artist doesn't have any upcoming concerts.\n\n-----------------------\n")
                process.exit()
            }
            console.log("-----------------------\n\nArtist: " + response.data[0].artist.name +
                "\nName of Venue: " + response.data[0].venue.name +
                "\nVenue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country +
                "\nDate of Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY, hh:00 A") + "\n\n-----------------------\n");

            // variables to pass through our logConcert variable to then call on to append to log.txt
            var artist = response.data[0].artist.name;
            var venueName = response.data[0].venue.name;
            var location = response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country;
            var date = moment(response.data[0].datetime).format("MM/DD/YYYY, hh:00 A");

            var logConcert = "\n\n-----Concert Log-----" + "\nArtist: " + artist + "\nName of Venue: " + venueName + "\nVenue Location: " + location + "\nDate of event: " + date + "\n";
            // appending information to log.txt file
            fs.appendFile("log.txt", logConcert, function (error) {
                if (error) throw error;
                console.log("Saved!");
            });
        })
};

function movie() {
    // if no search command is entered, print Mr. Nobody movie details
    if (!searchResult) {
        searchResult = "Mr. Nobody";
        console.log("\nIf you would like to search for a specific movie, please insert it after 'search for movie'.\nIn the meantime, here is a movie I recommend:")
    };
    // get OMDb API
    axios.get("http://www.omdbapi.com/?t=" + searchResult + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("\n-----------------------\n\nMovie Title: " + response.data.Title +
                "\nRelease Year: " + response.data.Year +
                "\nMovie Rated: " + response.data.Rated +
                "\nIMDb Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nProduced in: " + response.data.Country +
                "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nCast: " + response.data.Actors + "\n\n-----------------------\n");

            // variables to pass through our logMovie variable to then call on to append to log.txt
            var title = response.data.Title;
            var year = response.data.Year;
            var rated = response.data.Rated;
            var imdbRating = response.data.imdbRating;
            var tomRating = response.data.Ratings[1].Value;
            var produced = response.data.Country;
            var lang = response.data.Language;
            var plot = response.data.Plot;
            var cast = response.data.Actors;

            var logMovie = "\n\n-----Movie Log-----" + "\nMovie Title: " + title + "\nRelease Year: " + year + "\nMovie Rated: " + rated + "\nIMDb Rating: " + imdbRating + "\nRotten Tomatoes Rating: " + tomRating + "\nProduced in: " + produced + "\nLanguage: " + lang + "\nPlot: " + plot + "\nCast: " + cast + "\n\n";
            // appending information to log.txt file
            fs.appendFile("log.txt", logMovie, function (error) {
                if (error) throw error;
                console.log("Saved!");
            });
        });
};

function dowhatitsays() {
    // using readfile method to access random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        // use .split to separate strings within our file 
        var dataArr = data.split("|");

        for (var i = 0; i < dataArr.length; i++) {
            // taking objects from random.txt and passing as parameters 
            var dataArrT = dataArr[i].split(",");
            userInput = dataArrT[0];
            searchResult = dataArrT[1];

            // calling main function to display new parameters
            liriCommand(userInput, searchResult);
        }
    });
}