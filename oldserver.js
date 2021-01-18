'use strict';

const express = require('express'); // requires `npm install -S express`
const cors = require('cors'); // cross origin resource sharing (connections between 2 local servers/sites, can block/allow access to any list of URLs; by default allows localhost to talk to itself)
// const dotenv = require('dotenv');
// dotenv.config();
require('dotenv').config(); // this runs once and loads all env variables if they were declared in a file instead of terminal

// set up application (server)
const app = express(); // creates server from express library
app.use(cors()); //loads middleware 'cors' so our local requests don't get blocked


// other global variables
const PORT = process.env.PORT || 3111; // caps variables = magic variables; future devs shouldn't change. if you see the 3111 you should debug


// ---routes
app.get('/', (request, response) => {
  response.send('you made it here');
}); //   '/' : route - we can visit server at :3000 or :3000/ and trigger this callback
// app.get attaches a listener of type GET to server with a (route, and a callback)
// (request, response) : the callback function
// request : all data from client
// response : all data from us + we can attach data to it + we can trigger response to start with this parameter
// response.send(<anything>) - takes argument and sends it to client
// running `nodemon` and there is a server.js it will run the server. it will refresh it for you when you make changes


//localhost:3333/pet?name=ginger&quantity=3&lastName=carignan
// inside `request` will always live a property `query: ` <etc> from url
app.get('/pet', (req, res) => {
  console.log(req.query.name);
  let str = '';
  for (let i = 0; i < req.query.quantity; i++) {
    str += `about to pet ${req.query.name} ${req.query.lastName}`;
  }
  res.send(str);
});

app.get('/location', (req, res) => {
  //normalize data with a constructor
  const theDataArrayFromTheLocationJson = require('data/location.json'); //require gets things from a file
  const theDataObjFromJson = theDataArrayFromTheLocationJson[0];
  console.log('req.query', req.query);
  const searchedCity = req.query.city;
  const newLocation = new Location('seattle standin',
    theDataObjFromJson.display_name,
    theDataObjFromJson.lat,
    theDataObjFromJson.lon
  );
  res.send(newLocation); //'searchquery etc
});

// helper functions
function Location(search_query, formatted_query, latitude, longitude) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
}


// ---  start server
app.listen(PORT, () => console.log(`server up on PORT ${PORT}`));


