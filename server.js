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
  if (req.query.city === '') {
    res.status(500).send('Error : Field empty / no data submitted');
    console.log(status.message);
    return;
  }
  const locationQuery = req.query.city;
  const locationKey = process.env.GEOCODE_API_KEY;
  const locationUrl = `https://us1.locationiq.com/v1/search.php?key=${locationKey}&q=${locationQuery}&format=json`;
  superagent.get(locationUrl)
    .then(locationResponse => {
      console.log(locationResponse.body);
      const currentLocation = new Location(locationResponse.body[0], locationQuery);
      res.send(currentLocation);
    })
    .catch(err => {
      res.status(500).send('Error 500 : locationiq failed');
      console.log(err.message);
    });
});

// --- weather ---
app.get('/weather', (req, res) => {
  const weatherKey = process.env.WEATHER_API_KEY;
  const lat = req.query.latitude;
  const lon = req.query.longitude;
  // const currentWeather = req.query.body; // probably horribly wrong----
  const weatherUrl = `http://api.weatherbit.io/v2.0/current&key=${weatherKey}&lat=${lat}&lon=${lon}`; // how to get location data
  superagent.get(weatherUrl)
    .then(weatherRequest => {
      // console.log(weatherRequest.body);
      // const jsonData = weatherRequest.body[0];
      const weatherArr = [];
      const retrievedWeatherData = weatherRequest.body.data;
      retrievedWeatherData.map(obj => {
        weatherArr.push(new Weather(obj));
      });
      res.send(weatherArr);
    })
    .catch(err => {
      res.status(500).send('Error 500 : there is no weather');
      console.log(err.message);
    });
});



// ==== Helper Functions ====

function Location(search_query, formatted_query, latitude, longitude) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
}

function Weather(weatherObj) {
  // this.search_query = weatherObj.search_query;
  // this.precipitation = '300 gallons per second';
  this.forecast = weatherObj['weather']['description'];
  this.time = weatherObj.valid_date;
}



// ==== Start the server ====
app.listen(PORT, () => console.log(`running on PORT ${PORT}`));

