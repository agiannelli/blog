const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (lat, long, callback) => {
    const url =
        'http://api.weatherstack.com/current?access_key=9e7a75971846c588751d83cb7ecea012&query=' +
        lat +
        ',' +
        long +
        '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            var weather = body.current
            callback(
                undefined,
                weather.weather_descriptions[0] +
                    '. It is currently ' +
                    weather.temperature +
                    ' degress out. It feels like ' +
                    weather.feelslike +
                    ' degrees out. The humidity is ' +
                    weather.humidity +
                    '%.'
            )
        }
    })
}

module.exports = forecast
