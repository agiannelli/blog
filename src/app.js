const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./projects/weather/geocode')
const forecast = require('./projects/weather/forecast')

const app = express()
const port = process.env.PORT || 723

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {})
})

app.get('/about', (req, res) => {
    res.render('about', {})
})

app.get('/blog', (req, res) => {
    res.render('blog', {})
})

app.get('/portfolio', (req, res) => {
    res.render('portfolio', {})
})

app.get('/portfolio/weather', (req, res) => {
    res.render('weather', {})
})

app.get('/portfolio/*', (req, res) => {
    res.render('404', {
        title: '404 - Project Not Found -',
        errorMessage: 'Project article not found.'
    })
})

// api to get forecast
app.get('/weather', (req, res) => {
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

// wildcard to redirect to 404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Page Not Found',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
