const express = require('express')
const router = express.Router()

const geocode = require('../projects/weather/geocode')
const forecast = require('../projects/weather/forecast')

// api to get forecast
router.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Location cannot be null!'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({
                address: address,
                location,
                forecast
            })
        })
    })
})

module.exports = router
