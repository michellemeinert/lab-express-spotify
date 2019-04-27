const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');
 //require spotify-web-api-node package here:
hbs.registerPartials(__dirname + './views/partials/artistPartial.hbs')


const app = express();


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


 //setting the spotify-api goes here:
 //Remember to insert your credentials here
 const clientId = '5b74ca5a36344d02a308ef113248aace',
     clientSecret = '0ce8feb9b71e4edca3090d70ac78a257';

 const spotifyApi = new SpotifyWebApi({
   clientId : clientId,
   clientSecret : clientSecret
 });

// Retrieve an access token
 spotifyApi.clientCredentialsGrant()
   .then( data => {
     spotifyApi.setAccessToken(data.body['access_token']);
   })
   .catch(error => {
     console.log('Something went wrong when retrieving an access token', error);
   })





 //the routes go here:
app.get('/', (req, res, next)=>{
  res.render('layout')
})

app.get('/artists', (req, res, next)=>{
  console.log('req', req.query)
  console.log(req.query)
   spotifyApi.searchArtists(req.query.search)
       .then(data => {
  
         console.log("The received data from the API: ", data.body.artists.items);
         res.render('artists')
       })
       .catch(err => {
         console.log("The error while searching artists occurred: ", err);
       })
})


app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
