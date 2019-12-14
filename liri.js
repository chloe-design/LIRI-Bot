//the dotenv package
require("dotenv").config();

//import the keys.js file
import { spotify as _spotify } from "./keys.js";

// require file systems
import { appendFile, readFile } from "fs";

// require axios
import { get } from "axios";

// require moment
import moment from "moment";

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
            doThis();
    
    };


    liriCommand(userInput, searchResult);

    function spotify() {
        if (!searchResult) {
            searchResult = "Ain't No Mountain High enough"
            console.log("\n To search for a song enter the command 'search for song'.\n")
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
            appendFile("log.txt", logSpotify, function (error) {
                if (error) throw error;
                console.log("Saved!");
            });
        });
    };

    function searchforconcert() {
        // if no search command is entered, print Ariana Grande's concert info
        if (!searchResult) {
            searchResult = "Ariana Grande"
            console.log("\nTo search for a specific artist, please insert it after 'search for concert'.\n")
        };
        // get Bands in Town API
        get("https://rest.bandsintown.com/artists/" + searchResult + "/events?app_id=codingbootcamp").then(
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
                appendFile("log.txt", logConcert, function (error) {
                    if (error) throw error;
                    console.log("Saved!");
                });
            })
    };

    function movie() {
        if (!searchResult) {
            searchResult = "Mr. Nobody";
            console.log("\nTo search for a specific movie, please insert it after 'search for movie'.\n")
        };
        // get OMDb API
        get("http://www.omdbapi.com/?t=" + searchResult + "&y=&plot=short&apikey=trilogy").then(
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

                appendFile("log.txt", logMovie, function (error) {
                    if (error) throw error;
                    console.log("Saved!");
                });
            });
    };

    function dowhatitsays() {

        readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }


            var dataArr = data.split("|");

            for (var i = 0; i < dataArr.length; i++) {

                var dataArrT = dataArr[i].split(",");
                userInput = dataArrT[0];
                searchResult = dataArrT[1];


                liriCommand(userInput, searchResult);
            }
        });
    }
});