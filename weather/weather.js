const request = require('request')

const getWeather = (lat, long, callback) => {
  request({
    url: `https://api.forecast.io/forecast/bce5388be3e2734a11e5fc377cdca1bb/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback("Unable to fetch weather.");
    }
  });
};
module.exports.getWeather = getWeather;
