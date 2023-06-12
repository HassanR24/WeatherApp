const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var city = req.body.cityName;
  var upperCaseCity = city.charAt(0).toUpperCase() + city.slice(1);
  const query = city;
  const appid = "ab32478ffac7de20c294bf05e905b0b3";
  const unit = "metric";
  https.get(
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
      appid +
      "&q=" +
      query +
      "&units=" +
      unit,
    function (response) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const details = weatherData.weather[0].description;
        const imageCode = weatherData.weather[0].icon;
        const URL = "http://openweathermap.org/img/wn/" + imageCode + "@2x.png";

        res.write(
          "<h1>Current temp in " +
            upperCaseCity +
            " is " +
            temp +
            " degree celcius.</h1>"
        );
        res.write("<p>Weather condition: " + details + "</p>");
        res.write("<img src=" + URL + ">");
        res.send();
      });
    }
  );
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
