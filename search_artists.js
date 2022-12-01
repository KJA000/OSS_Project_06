const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId: '973dc4bd24f74955b91835afe04a5cd0',
  clientSecret: '1cca18a8c6634a3f8ce1b708a2318485',
});


spotifyApi
  .clientCredentialsGrant()
  .then(function(data) {
    // Set the access token
    spotifyApi.setAccessToken(data.body['access_token']);

    // Use the access token to retrieve information about the user connected to it
    return spotifyApi.searchTracks('사랑');
  })
  .then(function(data) {
    // Print some information about the results
    console.log('I got ' + data.body.tracks.total + ' results!');
    // data.body.tracks.items[0].artists[0].name
    // Go through the first page of results
    var firstPage = data.body.tracks.items;
    console.log('The tracks in the first page are (popularity in parentheses):');

    /*
     * 0: All of Me (97)
     * 1: My Love (91)
     * 2: I Love This Life (78)
     * ...
     */
    firstPage.forEach(function(track, index) {
      console.log(index + 1 + ': ' + track.name + ' (' + track.popularity + ')' + ' by ' + track.artists[0].name);
      console.log(track.artists[0])
    });
  }).catch(function(err) {
    console.log('Something went wrong:', err.message);
  });