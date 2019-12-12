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
