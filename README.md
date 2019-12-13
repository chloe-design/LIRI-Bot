# Liri Node App

Similarly to Siri on ios platforms that interprets Speech, LIRI is a Language interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

 click here to view video:

# Technology Used:

* Javascript
* Node.js
* Axios
* Inquirer
* Spotify API
* OMDB API
* Bands in Town API
* Moment.js

# Commands within LIRI App

There are four commands available within this application that allows the user to input and then calls upon different APIs to return data. The commands are:

* Search for Concert 
* Search for song
* Search for a Movie 
* Do what it says 

# Concert This
The application user will input 'search for concert' command. The user is then prompted for a band name. Liri then searches for the band name in the Bands in Town API and returns the results which is then added to the log text file.

# Spotify this song
The application user will input 'search for song" command. The user is then prompted for a song title. The Liri app then searches the Spotify API and returns the top results for the song title entered. This is also logged in the log.txt file.

# Movie This
The application user will input 'search for a movie' command and then be prompted to enter a movie title. The LIRI app will then search the OMBD API and return movie data for the title entered. This movie title search is also added to the log.txt file.

# Do what it says

The application user will input 'do what it says' command. The LIRI app will search the Spotify API and return a song.

# Spotify API keys
If you would like to clone this repo, you will have to include your own .env file with your personal Spotify ID and Secret.
The format of your .env file should be as follows:
SPOTIFY_ID=<your spotify id>
SPOTIFY_SECRET=<your spotify secret>

