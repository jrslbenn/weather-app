const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for.",
      string: true
    }
  })
  .help()
  .alias("help", 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBat9mGre-PmI9U6qTkkUCyc6uLcrxMd6I`

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === "ZERO_RESULTS") {
    throw new Error("Unable to find that address");
  }
  var lat = response.data.results[0].geometry.location.lat;
  var long = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.forecast.io/forecast/bce5388be3e2734a11e5fc377cdca1bb/${lat},${long}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log("Currently: ", temperature);
  console.log("Feels like: ", apparentTemperature);
}).catch((e) => {
  if (e.code === "ENOTFOUND") {
    console.log("Unable to connect to API servers.");
  } else {
    console.log(e.message);
  }
});
