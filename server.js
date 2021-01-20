'use strict';

// ==== packages ====
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');
// const { response } = require('express');
// const { json } = require('express');

// ==== setup the application (server) ====
const app = express();
app.use(cors());

// ==== other global variables ====
const PORT = process.env.PORT || 3111;

// ==== Routes ====

app.get('/', (request, response) => {
  response.send('WELCOME TO CITY EXPLORER 9000 PREPARE FOR BE AMAZEWOW');
});

app.get('/location', (req, res) => {
  const locationQuery = req.query.city;
  const key = process.env.GEOCODE_API_KEY;
  const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${locationQuery}&format=json`;

  superagent.get(url)
    .then(responseBack => {
      console.log(responseBack.body);
      const jsonData = responseBack.body[0];
      const currentLocation = new Location(
        locationQuery,
        jsonData.display_name,
        jsonData.lat,
        jsonData.lon
      );
      res.send(currentLocation);
    })
    .catch(err => {
      res.status(500).send('Error 500 : locationiq failed');
      console.log(err.message);
    });
});

// app.get('/restaurants', (req, res) => {
//   const data = require('./data/restaurants.json');
//   const arr = [];
//   data.nearby_restaurants.forEach(jsonObj => {
//     const restaurant = new Restaurant(jsonObj);
//     arr.push(restaurant);
//   });

//   res.send(arr);
// });

app.get('/weather', (req, res) => {
  // if (req.query.city === 'organmeat') {
  //   res.status(500).send('ERROR 500');
  //   return;
  // }
  const weatherData = require('./data/weather.json');
  const arr = []; //--- make .map
  // data.weather.forEach(jsonObj => {
  //   const weather = new Weather(jsonObj);
  //   arr.push(weather);
  // });
  weatherData.data.map(weatherObj => {
    // const forecast = weatherObj['weather']['description']; // could have been .weather.description equally
    // const time = weatherObj.valid_date; // also 'ts' is js time notation
    const newWeatherObj = new Weather(weatherObj);
    arr.push(newWeatherObj);
  });
  res.send(arr);


});

// ==== Helper Functions ====

function Location(search_query, formatted_query, latitude, longitude) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
}

// arr[0] === jsonObj
// function Restaurant(jsonObj) {
//   this.restaurant = jsonObj.restaurant.name;
//   this.locality = jsonObj.restaurant.location.locality_verbose;
//   this.cuisines = jsonObj.restaurant.cuisines;
// }

function Weather(weatherObj) {
  this.search_query = weatherObj.search_query;
  this.precipitation = '300 gallons per second';
  this.forecast = weatherObj['weather']['description'];
  this.time = weatherObj.valid_date;
}

// ==== Start the server ====
app.listen(PORT, () => console.log(`we are up on PORT ${PORT}`));

