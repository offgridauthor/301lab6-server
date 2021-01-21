'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');
// const { response } = require('express');
require('dotenv').config();


const app = express();
app.use(cors());
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);


const PORT = process.env.PORT || 3111;

app.get('/', getFront);
app.get('/location', getGpsCoordinates);
app.get('/weather', getWeather);
app.get('/parks', getParks);


function getFront(req, res) {
  res.send('Frontend here --> https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/');
}

function getGpsCoordinates(req, res) {
  const city = req.query.city;
  const key = process.env.GEOCODE_API_KEY;
  const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
  const sqlQuery = 'SELECT * FROM location WHERE search_query=$1';
  const sqlArray = [city];
  client.query(sqlQuery, sqlArray)
    .then(result => {
      superagent.get(url)
        .then(result => {
          // console.log(locationResponse.body);
          const currentLocation = result.body[0];
          const newLocation = new Location(
            city,
            currentLocation
          );
          const sqlQuery = 'INSERT INTO location (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4)';
          const sqlArray = [newLocation.search_query, newLocation.formatted_query, newLocation.latitude, newLocation.longitude];
          client.query(sqlQuery, sqlArray);
          res.send(newLocation);
          // console.log(result.body);

        })
        .catch(error => {
          console.error(error);
        });
      // res.send(result.rows[0]);
    });

}


function getWeather(req, res) {
  const key = process.env.WEATHER_API_KEY;
  //  const city = req.query.search_query;
  const longitude = req.query.latitude; // this is the same object as from location ("deterministic server call") --this information is in req.url---
  const latitude = req.query.latitude;
  const url = `http://api.weatherbit.io/v2.0/current&key=${key}&lat=${latitude}&lon=${longitude}`;
  superagent.get(url)
    .then(result => {
      const arr = result.body.data.map(obj => {
        const newObj = new Weather(obj);
        return newObj;
      });
      res.send(arr);
    })
    .catch(error => {
      console.error(error);
    });



}

function getParks(req, res) {
  const parkCity = req.query.formatted_query;
  const parkKey = process.env.PARKS_API_KEY;
  const parkUrl = `https://developer.nps.gov/api/v1/parks?q=${parkCity}&limit=10&api_key=${parkKey}`;
  superagent.get(parkUrl)
    .then(parkRequest => {
      //      console.log(parkRequest.body);
      const parkArr = [];
      const parkData = parkRequest.body.data;
      parkData.map(obj => {
        parkArr.push(new Park(obj));

      });
      res.send(parkArr);
    });
}/*  */

function Location(city, obj) {
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.longitude = obj.lon;
  this.latitude = obj.lat;
}

function Weather(obj) {
  this.weather = obj.weather.description;
  this.time = obj.valid_date;
}

function Park(obj) {
  this.name = obj.fullName;
  this.addr = `${obj.addresses[0].line1} ${obj.addresses[0].city}, ${obj.addresses[0].stateCode} ${obj.addresses[0].postalCode}`;
  this.fee = obj.entranceFees.cost;
  this.url = obj.url;
  this.description = obj.description;
}

client.connect();
app.listen(PORT, () => console.log(`up on PORT: ${PORT}`));
