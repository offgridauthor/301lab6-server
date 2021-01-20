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
  response.send('Frontend here --> https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/');
});

app.get('/location', (req, res) => {
  if (req.query.city === '') {
    res.status(500).send('Error : Field empty / no data submitted');
    console.log(status.message);
    return;
  }
  const locationQuery = req.query.city;
  // console.log(req.query.city);
  const locationKey = process.env.GEOCODE_API_KEY;
  const locationUrl = `https://us1.locationiq.com/v1/search.php?key=${locationKey}&q=${locationQuery}&format=json`;
  superagent.get(locationUrl)
    .then(locationResponse => {
      // console.log(locationResponse.body);
      const currentLocation = locationResponse.body[0];
      const newLocation = new Location(
        locationQuery,
        currentLocation.display_name,
        currentLocation.lat,
        currentLocation.lon
      );
      // console.log(currentLocation);
      // console.log(locationResponse.body);
      // console.log(locationResponse.body[0]);

      res.send(newLocation);
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
// app.get('/parks', (req, res) => {
//   const parkCity = req.query.formatted_query;
//   const parkKey = process.env.PARKS_API_KEY;
//   const parkUrl = `https://developer.nps.gov/api/v1/parks?q=${parkCity}&limit=5&api_key=${parkKey}`;
//   superagent.get(parkUrl)
//     .then(parkRequest => {
//       console.log(parkRequest.body);
//       const parkArr = [];
//       const parkData = parkRequest.body.data;
//       parkData.map(obj => {
//         parkArr.push(new Park(obj));

//       });
//       res.send(parkArr); // display first ten
//     });
// });



// ==== Helper Functions ====

function Location(search_query, formatted_query, lat, lon) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = lon;
  this.latitude = lat;
}

function Weather(weatherObj) {
  // this.search_query = weatherObj.search_query;
  // this.precipitation = '300 gallons per second';
  this.forecast = weatherObj['weather']['description'];
  this.time = weatherObj.valid_date;
}

// function Park(obj) {
//   this.name = obj.name;
//   this.addr = obj.address;
//   this.fee = obj.fee;
//   this.description = obj.description;
// }

// ==== Start the server ====
app.listen(PORT, () => console.log(`running on PORT ${PORT}`));

