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
        type: 'key in',
        name: 'call'
        message: 'Enter in a request from: concert this, spotify this song, movie this and do what it says'
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
        case "Do what Says":
            dowhatitsays();
            break;
    }
})